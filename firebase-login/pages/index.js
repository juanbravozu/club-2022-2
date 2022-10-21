import { useCallback, useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

async function getClicksData() {
  const userDoc = doc(db, `users/Cb6zTmh4kDqfmJURQGJB`);
  const data = await getDoc(userDoc);
  let {clicks} = data.data();

  return [clicks, userDoc]
}

export default function Home(
  {
    clicks
  }
) {
  const [counter, setCounter] = useState(clicks ? clicks : 0);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      if(loading) return;

      setLoading(true);

      let [clicks, userDoc] = await getClicksData();
      
      clicks++;
      await updateDoc(userDoc, {clicks});
      console.log(clicks);
      setCounter(clicks);
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [setCounter]);

  return (
    <div>
      <button onClick={handleClick}>
        {counter}
      </button>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const [clicks] = await getClicksData();

    return {
      props: {clicks}
    }
  } catch(error) {
    console.error(error.message);

    return {
      props: {error: error.message}
    };
  }
}
