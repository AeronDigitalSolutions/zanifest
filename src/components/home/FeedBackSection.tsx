import React from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { IFeedbackItem } from '@/models/feedback';
import Carousel from '../ui/CarousalHtml';
import FeedbackMobile from '../ui/FeedbackMobile';
import styles from '@/styles/components/home/FeedBackSection.module.css';
import { FaEllipsisH } from 'react-icons/fa';

interface IFeedbackApiResponse {
  success: boolean;
  data: IFeedbackItem[];
  heading?: string;
  message?: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// 🔹 Helper to render heading with <...> styled
const renderHeading = (heading: string) => {
  const parts = heading.split(/(<[^>]+>)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("<") && part.endsWith(">")) {
      return (
        <span key={idx} className={styles.orange}>
          {part.replace(/[<>]/g, "")}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};

const FeedBackSection: React.FC = () => {
  const { data, error, isLoading } = useSWR<IFeedbackApiResponse>('/api/feedback', fetcher, {
    refreshInterval: 5000,
  });

  if (isLoading) return <div className={styles.cont}>Loading Feedback...</div>;
  if (error) return <div className={styles.cont}>Failed to load feedback.</div>;
  if (!data?.success || !data.data) return <div className={styles.cont}>No feedback available.</div>;

  const feedbackList: IFeedbackItem[] = data.data;
  const displayHeading = data.heading ?? "What Our <Customers> Are Saying?";

  const slides = feedbackList.map((item, index) => (
    <div className={styles.serviceItem} key={String(item._id ?? index)}>
      <h6 className={styles.desc}>{item.desc}</h6>
      <div className={styles.itemBottom}>
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          unoptimized
          className={styles.image}
        />
        <div className={styles.namePost}>
          <h2 className={styles.name}>{item.name}</h2>
          <h2 className={styles.post}>{item.post}</h2>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.cont}>
      <div className={styles.head}>
        <div className={styles.heading}>
          {renderHeading(displayHeading)}
        </div>
      </div>
      <div className={styles.mobileEllipsis}>
        <FaEllipsisH style={{ color: '#fa621a', fontSize: '25px' }} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.singlecar}>
          <FeedbackMobile items={slides} />
        </div>
        <div className={styles.multicar}>
          <Carousel items={feedbackList} />
        </div>
      </div>
    </div>
  );
};

export default FeedBackSection;
