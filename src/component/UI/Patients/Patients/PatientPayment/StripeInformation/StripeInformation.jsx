import { IdcardOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

const StripeInformation = () => {
  const formRef = React.useRef(null);

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <h1 className="text-lg mt-2 text-orange-500">Credit or Debit Card</h1>
      <div className="border border-secondary p-5 rounded max-w-md bg-[#EFF7F8] my-8">
        <p className="text-sm mb-2 font-thin">
          We do not store any financial or card details anywhere on our system.
          The details collected to make any payment are taken in a secure manner
          and passed directly to a payment gateway to make the payment.
        </p>
        <p className="text-sm font-thin">
          The Card Verification Value (CVV) is an anti-fraud security feature
          and required for verification purposes. The CVV Number on the credit
          card is a 3 or 4 digit number located on the back or the front of the
          card.
        </p>
      </div>
      <div>
        <Form
          ref={formRef}
          name="control-ref"
          layout="vertical"
          onFinish={onFinish}
          style={{
            maxWidth: 450,
            marginTop: 20,
          }}
        >
          <Form.Item
            name="card_name"
            label="Name On Card"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input addonBefore={<UserOutlined />} placeholder="Card Name" />
          </Form.Item>

          <Form.Item
            name="card_number"
            label="Card Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input addonBefore={<IdcardOutlined />} placeholder="Card Number" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={10}>
              <Form.Item
                name="CVV"
                label="CVV"
                rules={[
                  { required: true, message: "Please input the cvv you got!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Month"
                label="Month"
                rules={[{ required: true, message: "Please input the month " }]}
              >
                <DatePicker picker="month" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="Year"
                label="Year"
                rules={[{ required: true, message: "Please input the year " }]}
              >
                <DatePicker picker="year" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StripeInformation;
