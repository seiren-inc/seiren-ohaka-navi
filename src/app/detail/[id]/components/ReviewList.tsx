import { FacilityReview } from "../mock";
import { Star, User } from "lucide-react";

interface ReviewListProps {
    reviews: FacilityReview[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (!reviews.length) return <p className="text-gray-500 text-sm">口コミはまだありません。</p>;

    return (
        <div className="space-y-6">
            {reviews.map(review => (
                <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-primary">{review.user}</p>
                                <div className="flex items-center">
                                    <div className="flex text-warm-gold mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < review.score ? 'fill-current' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-lg font-bold text-primary">{review.score}.0</div>
                    </div>

                    <p className="text-sm text-gray-700 leading-loose mb-4">
                        {review.comment}
                    </p>

                    {review.tags && (
                        <div className="flex gap-2">
                            {review.tags.map(tag => (
                                <span key={tag} className="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <button className="w-full py-3 text-sm text-primary font-bold border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                すべての口コミを見る
            </button>
        </div>
    );
}
