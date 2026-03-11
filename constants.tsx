
import React from 'react';
import { Leaf, Award, Star, Heart, Trophy } from 'lucide-react';
import { Badge } from './types';

export const BADGES: Badge[] = [
  {
    id: 'eco-friend',
    name: 'صديق البيئة',
    description: 'جمعت أول 10 قطع بلاستيكية',
    icon: 'Leaf',
    threshold: 10,
  },
  {
    id: 'eco-hero',
    name: 'بطل البيئة',
    description: 'جمعت 100 قطعة بلاستيكية',
    icon: 'Award',
    threshold: 100,
  },
  {
    id: 'hope-ambassador',
    name: 'سفير الأمل',
    description: 'جمعت 500 قطعة بلاستيكية',
    icon: 'Heart',
    threshold: 500,
  },
  {
    id: 'giving-knight',
    name: 'فارس العطاء',
    description: 'جمعت 1000 قطعة أو أكثر',
    icon: 'Trophy',
    threshold: 1000,
  }
];

export const POINTS_PER_ITEM = 1;
