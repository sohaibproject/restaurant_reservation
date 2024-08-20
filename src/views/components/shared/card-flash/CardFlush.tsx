import React, { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import { cn } from '../../../../@core/_lib/twMerge';
import './CardFlush.scss';
interface CarsFlushProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  titleText?: string | null;
  hasError?: boolean;
  addClass?: string;
  styles?: CSSProperties;
  subTitle?: string | null;
}

const CardFlush = ({ title, children, addClass, styles, subTitle, ...resetProps }: CarsFlushProps) => {
  return (
    <div {...resetProps} className={cn('card-flush', resetProps.className)}>
      {title && (
        <div className='card-title' style={{ marginBottom: 0 }}>
          <div className={`${subTitle ? 'mb-0' : ''} capitalize`}> {title} </div>
        </div>
      )}

      {subTitle && <p className={'sub-title mb-3'}>{subTitle}</p>}

      {children}
    </div>
  );
};
export default CardFlush;
