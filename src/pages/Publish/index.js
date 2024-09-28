import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/article'
import { request } from '@/utils'

const { Option } = Select

const Publish = () => {
    //获取频道列表
    const [channelList,setChannelList] = useState([])
    useEffect(()=>{
        const getChannelList = async ()=>{
          const res = await  getChannelAPI()
          setChannelList(res.data.channels)
        }
        getChannelList()
    },[])
    //提交表单  createArticleAPI
    const onFinish = async (formValue) => {
        if (imageType !== imageList.length) return message.warning('图片类型和数量不一致')
        const { channel_id, content, title } = formValue
        const reqData = {
          channel_id,
          content,
          title,
          type: imageType,
          cover: {
            type: imageType,
            images: imageList.map(item => item.response.data.url)
          }
        }
        createArticleAPI(reqData)
        message.success('发布文章成功')
      }
    //上传回调
    const cacheImageList = useRef([])
    const [imageList,setImageList] = useState([])
    const onChange = (value)=>{
        // console.log(value);
        setImageList(value.fileList)
        cacheImageList.current = value.fileList
    }
    //切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (value) => {
        const type = value.target.value
        setImageType(type)
        if (type === 1) {
          // 单图，截取第一张展示
          const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
          setImageList(imgList)
        } else if (type === 3) {
          // 三图，取所有图片展示
          setImageList(cacheImageList.current)
        }
    }
    return (
        <div className="publish">
            <Card title={<Breadcrumb items={[{ title: <Link to={'/'}>首页</Link> },{ title: '发布文章' },]} /> }>
                <Form onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ type: 0 }} >

                    <Form.Item label="标题" name="title"  rules={[{ required: true, message: '请输入文章标题' }]}>
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id" rules={[{ required: true, message: '请选择文章频道' }]}>
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
                            {channelList.map(item =>(<Option key={item.id} value={item.id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}><Radio value={1}>单图</Radio><Radio value={3}>三图</Radio><Radio value={0}>无图</Radio></Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload maxCount={imageType} multiple={imageType > 1} onChange={onChange} fileList={imageList} action={'http://geek.itheima.net/v1_0/upload'} name='image' listType="picture-card" showUploadList><div style={{ marginTop: 8 }}><PlusOutlined /></div></Upload>}         
                    </Form.Item>

                    <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
                        {/* 富文本 */}
                        <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">发布文章 </Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}

export default Publish