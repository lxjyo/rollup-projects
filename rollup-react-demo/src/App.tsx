import React, { Suspense, lazy, useState } from 'react';
import Button from '@/components/Button';
import rollupSvg from '@/assets/rollup.svg'

const About = lazy(() => delayDemo(import('@/components/About'), 2000));

//添加一个固定延迟，以便看到加载效果
async function delayDemo(promise: Promise<any>, delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(() => promise);
}

const App = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setShow(!show)}>切换</Button>
      {show && (
        <Suspense fallback={<>loading...</>}>
          <About />
        </Suspense>
      )}
       <img src={rollupSvg} />
    </>
  );
};
export default App;
