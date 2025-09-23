import React from 'react';
import { Feather } from '@expo/vector-icons';

interface TabBarIconProps {
  name: keyof typeof Feather.glyphMap;
  color: string;
  size: number;
}

export function TabBarIcon({ name, color, size }: TabBarIconProps) {
  return <Feather name={name} size={size} color={color} />;
}