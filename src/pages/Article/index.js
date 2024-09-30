import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
//汉化包
import locale from 'antd/es/date-picker/locale/zh_CN'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { delArticleAPI, getArticleAPI } from '@/apis/article'
import { render } from '@testing-library/react'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const { channelList } = useChannel()
    //定义状态枚举
    const status = {
        1: <Tag color='warning'>待审核</Tag>,
        2: <Tag color="green">审核通过</Tag>
    }
    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {title: '标题', dataIndex: 'title', width: 220},
        {title: '状态',dataIndex: 'status',render: data => status[data]},
        {title: '发布时间',dataIndex: 'pubdate'},
        { title: '阅读数',dataIndex: 'read_count'},
        {title: '评论数',dataIndex: 'comment_count'},
        {title: '点赞数',dataIndex: 'like_count'},
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
                <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
              </Space>
            )
          }
        }
      ]
      // 准备表格body数据
      const data = [
        {
          id: '8218',
          comment_count: 0,
          cover: {
            images: [],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案'
        }
      ]
      //筛选功能
      //1 准备参数
      const [reqData,setReqData] = useState({
        status:'',
        channel_id:'',
        begin_pubdate:'',
        end_pubdate:'',
        page:1,
        per_page:4
      })
      //获取文章列表
      const [list,setList] =  useState([])
      const [count,setCount] = useState(0)
      useEffect(()=>{
        async function getList() {
            const res = await getArticleAPI(reqData)
            setList(res.data.results)
            setCount(res.data.total_count)
        }
        getList()
      },[reqData])
      //2 获取当前筛选数据
      const onFinish = (formValue)=>{
        console.log(formValue);
        //把表单收集到的数据放到参数中
        setReqData({
          ...reqData,
          channel_id:formValue.channel_id,
          status:formValue.status,
          begin_pubdate:formValue.date[0].format('YYYY-MM-DD'),
          end_pubdate:formValue.date[1].format('YYYY-MM-DD')
        })
        // 2. 使用参数获取新的列表
        //reqData 参数发生变化，list自动重新执行
      }
      //分页
      const onPageChannge = (page)=>{
        // console.log(page);
        // 修改参数依赖项 引发数据渲染
        setReqData({
          ...reqData,
          page
        })
      }
      //删除
      const delArticle = async (data)=>{
        // console.log(data.id);
        await delArticleAPI(data.id)
        //重新渲染list
        setReqData({
          ...reqData
        })
      }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue=""
              style={{ width: 120 }}
            >
             {channelList.map(item=> <Option value={item.id} key={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
        {/* 列表 */}
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
             <Table rowKey="id" columns={columns} dataSource={list} pagination={{
              total:count,pageSize:reqData.per_page,onChange:onPageChannge
             }} />
        </Card>
      </Card>
    </div>
  )
}

export default Article