import { getChannelAPI } from "@/apis/article";
import { useEffect, useState } from "react";

function useChannel() {
  // 获取频道列表
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const getChannelList = async () => {
      try {
        const res = await getChannelAPI();
        setChannelList(res.data.channels);
      } catch (error) {
        console.error("Failed to fetch channel list:", error);
      }
    };
    getChannelList();
  }, []);

  // 返回一个对象，包含 channelList
  return { channelList };
}

export { useChannel };
