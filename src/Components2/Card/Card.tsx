import React, { ReactNode } from 'react';
import logo from './logo.svg';
import { Typography, Stack } from '@mui/material';
import styles from "./Card.module.css"

interface CardProps {
  children: ReactNode;
  cardClass?: string;
}

function Card({ children, cardClass }: CardProps) {
  return (
    <Typography component="div" className={`${styles.card} ${cardClass}`}>
      {children}
    </Typography>
  );
}

export default Card;
