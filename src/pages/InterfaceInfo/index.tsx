import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Divider, message} from 'antd';
import {Card, Descriptions, Button, Form, Input} from "antd";
import {
  getInterfacesInfoVoByIdUsingGet,
  invokeInterfacesUsingPost
} from "@/services/Hzx-Open-Apis-Platform/interfacesController";
// import {listInterfacesInfoByPageUsingPost} from "@/services/Hzx-Open-Apis-Platform/interfacesController";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfacesInfo[]>([]);
  // const [total, setTotal] = useState<number>(0);
  //使用 useMatch 钩子函数将当前 URL 与指定的路径模式/interface_info/:id 进行匹配
  //将匹配到的结果赋值给 match 变量
  // const match = useMatch('/interface_info/:id');
  // alert(JSON.stringify(match));

  // 存储结果变量
  const [invokeRes, setInvokeRes] = useState<any>();
  // 调用加载状态变量，默认为 false
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams();

  const loadData = async () => {
    //开始加载数据，设置 loading 状态为 true
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfacesInfoVoByIdUsingGet({
        id: Number(params.id),
      });
      // 将请求返回的数据设置到列表数据状态中
      setData(res.data);
      // console.log("InterfaceInfo:", data);
    } catch (error: any) {
      //请求失败处理
      message.error("请求失败" + error.message);
    }
    // 请求完成，设置 loading 状态为 false, 表示请求结束，可以停止加载状态的显示
    setLoading(false)
  }

  useEffect(() => {
    //页面加载完成之后调用加载数据的函数
    loadData();
  }, []);

  //点击完成请求接口
  const onFinish = async (values: any) => {
    // 检查是否存在接口id
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    //在开始调用接口之前, 将 invokeLoading 设置为 true, 表示正在加载中....
    setInvokeLoading(true);
    try {
      // 发起接口调用请求，传入一个对象作为参数，这个对象包含了id和values的属性，
      // 其中，id 是从 params 中获取的，而 values 是函数的参数
      const res = await invokeInterfacesUsingPost({
        id: params.id,
        ...values,
      });
      // 将接口调用的结果 (res.data) 更新到 invokeRes 状态变量中
      setInvokeRes(res.data);
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }

    //表示加载完成
    setInvokeLoading(false);
  };

  return (
    <PageContainer title="Jools 在线接口开发平台">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={2}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card>
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider/>
      <Card title="返回的结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
