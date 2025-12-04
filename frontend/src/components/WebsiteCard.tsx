import React from 'react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import { Star, Bookmark, ExternalLink, Sparkles } from 'lucide-react';
import { Website } from '../types/index';
import { useAuth } from '../context/AuthContext';

interface WebsiteCardProps {
  website: Website;
  onBookmark: (websiteId: string) => void;
  onRate: (websiteId: string, rating: number) => void;
  isBookmarked: boolean;
  userRating: number;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  website,
  onBookmark,
  onRate,
  isBookmarked,
  userRating,
}) => {
  const { user } = useAuth();

  const handleBookmark = () => {
    if (!user) {
      alert('Please login to bookmark websites');
      return;
    }
    onBookmark(website._id);
  };

  const handleRate = (rating: number) => {
    if (!user) {
      alert('Please login to rate websites');
      return;
    }
    onRate(website._id, rating);
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-pink-500/[0.1] border-2 border-pink-100 w-auto sm:w-[30rem] h-auto rounded-xl p-6">
        {/* Bookmark Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-all ${
              isBookmarked
                ? 'bg-pink-100 text-pink-600'
                : 'bg-gray-100 text-gray-400 hover:text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Thumbnail/Icon */}
        <CardItem translateZ="50" className="text-6xl mb-4">
          {website.thumbnail}
        </CardItem>

        {/* Website Name */}
        <CardItem
          translateZ="60"
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {website.name}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="70"
          className="text-gray-600 text-sm mb-4 line-clamp-3 h-16"
        >
          {website.description}
        </CardItem>

        {/* Category and Featured Badge */}
        <CardItem translateZ="80" className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-semibold rounded-full">
            {website.category}
          </span>
          {website.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1">
              <Sparkles size={12} /> Featured
            </span>
          )}
        </CardItem>

        {/* Rating Stars */}
        <CardItem translateZ="90" className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={18}
                fill={star <= userRating ? '#fbbf24' : star <= Math.round(website.averageRating) ? '#d1d5db' : 'none'}
                className={
                  star <= userRating
                    ? 'text-yellow-400'
                    : star <= Math.round(website.averageRating)
                    ? 'text-gray-300'
                    : 'text-gray-300'
                }
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">
            {website.averageRating.toFixed(1)}
          </span>
        </CardItem>

        {/* Visit Button */}
        <CardItem
          translateZ={100}
          as="a"
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold shadow-lg">
            Visit Website <ExternalLink size={16} />
          </button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};
