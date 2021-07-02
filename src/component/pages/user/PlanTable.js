import "antd/dist/antd.css"

import React from 'react'
import {Table} from 'antd'

function Plan ({ columns, list, onRowChecked }) {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            onRowChecked(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
      };

    return(
        <div>
            <Table className='plan-table' 
                key={list.NO_PLAN}
                dataSource={list} 
                columns={columns}
                pagination={false} 
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }} 
                height={300}
                scroll={{ x: 300, y: 300 }}/>
        </div>
    )
}

export default Plan