'use client'

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../provider/globalProvider";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const { push } = useRouter();
  const globalCtx = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([])

  if (!globalCtx?.isLogin) push('/login');

  const fetchData = async () => {
    await axios({
      method: 'get',
      url: 'https://api-interview.blankontech.com/api/careers/',
      headers: {
        Authorization: 'Token ' + globalCtx?.profile.token,
      }
    }).then((res) => {
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="h-screen p-10">
      <div className="w-full flex gap-10">
        <div>
          <div>
            <p>Hi, John Doe!</p>
            <p>Don`t miss out on the opportunity to advance your career, browse our job listings now!</p>
          </div>
          <div>
            <input />
          </div>

          <div className="flex flex-col gap-10">
            {
              data && data.map((item: any) => (
                <div key={item.id} className="border p-2 rounded-md">
                  <p>{item.job_title}/{item.position}</p>
                  <p>{}</p>
                  <p>$500</p>
                  <div>
                    <div><p>state</p></div>
                    <div><p>10 mins ago</p></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
