import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const DisplayCsvDataTable = (props) => {
    const [data, setData] = useState(props.data);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

    useEffect(() => {
        setData(props.data);
    }, [props.data])
    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable>

            <DataTable.Header>
                <DataTable.Title>Title</DataTable.Title>
                <DataTable.Title numeric>Description</DataTable.Title>
                <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>
            {data && data.map((item, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.title}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.description}</DataTable.Cell>
                    <DataTable.Cell numeric></DataTable.Cell>
                </DataTable.Row>
            )
            )}

            <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
            />
        </DataTable>
    );
}

export default DisplayCsvDataTable;