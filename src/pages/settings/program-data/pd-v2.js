/* eslint-disable react-hooks/rules-of-hooks */
import RootLayout from "@/component/Layouts/RootLayout";
import SettingLayout from "@/component/Layouts/SettingLayout";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table } from "antd";
import React, { useState } from "react";

const version2 = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "edit",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
  ]);
  const columns = [
    {
      key: "sort",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const Row = ({ children, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props["data-row-key"],
    });
    const style = {
      ...props.style,
      transform: transform
        ? `translate(${transform.x}px, ${transform.y}px)`
        : "none",
      transition,
      ...(isDragging
        ? {
            position: "relative",
            zIndex: 9999,
          }
        : {}),
    };
    return (
      <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if (child.key === "sort") {
            return React.cloneElement(child, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{
                    touchAction: "none",
                    cursor: "move",
                  }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    );
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="key"
          columns={columns}
          pagination={false}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default version2;

version2.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SettingLayout>{page}</SettingLayout>
    </RootLayout>
  );
};
