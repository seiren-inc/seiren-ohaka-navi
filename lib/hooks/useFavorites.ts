"use client";

import { useState, useEffect, useCallback } from "react";
import { Temple } from "../store";

export interface FavoriteItem {
  id: string; // temple.id
  name: string;
  type: string; // 永代供養墓, 樹木葬, etc.
  address: string;
  priceMin?: number;
  image?: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初回ロード時にlocalStorageから読み込む
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("seiren_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse favorites from localStorage", e);
    }
    setIsInitialized(true);
  }, []);

  // favoritesが更新されたらlocalStorageに保存する（初期化後のみ）
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInitialized) {
      window.localStorage.setItem("seiren_favorites", JSON.stringify(favorites));
      // 同一オリジンの他のタブ・ウィンドウと同期するためのイベント発火はStorageEventで自動的に行われる
    }
  }, [favorites, isInitialized]);

  // 他のタブでのlocalStorageの変更を検知して同期する
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "seiren_favorites" && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing new favorites from storage event", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addFavorite = useCallback((temple: Temple) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === temple.id)) return prev; // 既に追加済み

      const newItem: FavoriteItem = {
        id: temple.id,
        name: temple.name,
        type: temple.type,
        address: temple.address,
        priceMin: temple.priceAggMin || undefined,
        image: temple.mainImage || undefined,
        addedAt: Date.now(),
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (temple: Temple) => {
      const isFav = favorites.some((f) => f.id === temple.id);
      if (isFav) {
        removeFavorite(temple.id);
      } else {
        addFavorite(temple);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  return {
    favorites,
    isInitialized,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}
