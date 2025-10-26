import React from 'react';
import { Link } from 'react-router-dom';

export interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  linkTo?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, category, title, excerpt, date, linkTo = "/noticias" }) => (
  <Link to={linkTo} className="flex flex-col md:flex-row group overflow-hidden rounded-lg shadow-lg bg-[#061121] hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
    <div className="md:w-2/5 shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6 md:p-8 flex flex-col justify-center">
      <p className="text-sm font-semibold text-[#003782] uppercase mb-2">{category}</p>
      <h3 className="text-3xl font-bold text-white font-['Teko'] mb-3 leading-tight group-hover:text-[#003782] transition-colors">{title}</h3>
      <p className="text-slate-400 mb-4 text-lg">{excerpt}</p>
      <p className="text-sm text-slate-500 mt-auto">{date}</p>
    </div>
  </Link>
);

export default NewsCard;
