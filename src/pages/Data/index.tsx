import styles from "./index.less";
import { Card, Button, Input, Empty } from "antd";
import * as _ from "lodash";
import { useState, useEffect } from "react";
import request from "@/utils/request";

const gridStyle: {} = {
  width: "100%",
};

export default function Data() {
  const [sendInput, setSendInput] = useState("");
  const [nodeMsg, setNodeMsg] = useState({ node1: [], node2: [] });
  const [nodeTitle, setNodeTitle] = useState<string[]>(["", ""]);
  const [msg, SetMsg] = useState("远程调用返回结果展示在这里");

  const inputChange = (e: any) => {
    setSendInput(e.target.value);
  };

  async function sendInputFn() {
      const res = await request.get('/sendMsg',{
          params: {
            msg:sendInput
          }
      })
    SetMsg(res);
  }
  useEffect(() => {
    async function firstLoad() {
      await request.get("/init");
      async function getMsg() {
        const nodeMsgRes = await request.get("/getNodesMsg");
        const arrNode = Object.keys(nodeMsgRes);
        setNodeTitle(arrNode);
        setNodeMsg({
          node1: nodeMsgRes[arrNode[0]],
          node2: nodeMsgRes[arrNode[1]],
        });
      }
      setInterval(()=>{
          console.log('轮询');
          getMsg()
      },60000);
      await getMsg();
    }
    firstLoad();
  }, []);



  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.leftContainer} ${styles.dataContainer}`}>
        {nodeMsg.node1.length === 0 ? (
          <Empty />
        ) : (
          <Card title={nodeTitle[0]} bordered={false}>
            {nodeMsg.node1.map((item: any) => {
              return (
                <Card.Grid key={item} style={gridStyle}>
                  {item}
                </Card.Grid>
              );
            })}
          </Card>
        )}
      </div>
      <div className={`${styles.centerContainer} ${styles.dataContainer}`}>
        {nodeMsg.node2.length === 0 ? (
          <Empty />
        ) : (
          <Card title={nodeTitle[1]} bordered={false}>
            {nodeMsg.node2.map((item: any) => {
              return (
                <Card.Grid key={item} style={gridStyle}>
                  {item}
                </Card.Grid>
              );
            })}
          </Card>
        )}
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.sendInput}>
          <Input
            placeholder="远程调用参数"
            value={sendInput}
            onChange={inputChange}
          />
          <Button type="primary" onClick={sendInputFn}>
            发送
          </Button>
        </div>

        <div className={styles.msgContainer}>{msg}</div>
      </div>
    </div>
  );
}
