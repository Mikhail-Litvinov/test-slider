'use client'

import { Slider } from '@/widgets/slider';
import styles from './home.module.scss'
import { BgLine } from '@/shared/ui/bgLines';
import { useEffect, useState } from 'react';
import { $isMobile, setIsMobile } from '@/store/browserStore';
import { useUnit } from 'effector-react';
import { $clusters, setClusters } from '@/store/dataStore';

export default function Home() {
  const isMobile = useUnit($isMobile)
  const clusters = useUnit($clusters)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {

    function updateScreenSize() {
      const clientWidth = document.documentElement.clientWidth
      setIsMobile(clientWidth <= 1023)
    }

    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()

    return () => window.removeEventListener('resize', updateScreenSize)
  }, [isMobile])



  useEffect(() => {
    const fetchSlides = async () => {
      const response = await fetch('/api/get-events');
      const data = await response.json();
      setClusters(data);
      setIsLoading(false)
    };
    fetchSlides();
  }, []);

  return (
    <div className={styles.container}>
      <BgLine direction='vertical' />
      <Slider
        clusters={clusters}
        isLoading={isLoading}
      />
    </div>
  );
}
