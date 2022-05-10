import styles from './index.less';
import { Layout } from 'antd';

const {Footer} = Layout;

export default function IndexLayout(props: any) {
  return (
      <div className={styles.basicLayout}>
        <header className={styles.title}>基于Netty的面向接口代理的RPC框架（/my-rpc）</header>
        <div className={styles.container}>
          {props.children}
        </div>
        <Footer style={{ textAlign: 'center' }}>刘以强 毕业设计</Footer>
    </div>
  );
}
