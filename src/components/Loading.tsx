import React from 'react';
import './Loading.scss';

type Props = {
  loadingText?: string;
};

const Loading: React.FC<Props> = ({ loadingText = 'Loading' }) => (
  <div className="loading">
    <div className="loading__text">{loadingText}</div>
  </div>
);

export default Loading;
