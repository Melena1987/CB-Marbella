import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';

export interface NewsCardProps {
  id?: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  linkTo?: string;
  user?: User | null;
  onDelete?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, category, title, excerpt, date, linkTo = "#", user, onDelete }) => {
  
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  
  return (
    <div className="relative group/card">
      <Link to={linkTo} className="flex flex-col md:flex-row group/link overflow-hidden rounded-lg shadow-lg bg-[#061121] hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
        <div className="md:w-2/5 shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover aspect-[4/5] group-hover/link:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <p className="text-sm font-semibold text-[#003782] uppercase mb-2">{category}</p>
          <h3 className="text-3xl font-bold text-white font-['Teko'] mb-3 leading-tight group-hover/link:text-[#003782] transition-colors">{title}</h3>
          <p className="text-slate-400 mb-4 text-lg">{excerpt}</p>
          <p className="text-sm text-slate-500 mt-auto">{date}</p>
        </div>
      </Link>
      {user && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1.5 bg-red-600/90 rounded-full text-white opacity-0 group-hover/card:opacity-100 transition-opacity z-10 hover:bg-red-500"
          aria-label={`Eliminar noticia ${title}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NewsCard;
