import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import NewElement from './components/NewElement';
import DeleteElement from './components/DeleteElement';
import {
    DataTable,
    TableHead,
    TableBody,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
    Checkbox,
    IconSettings24,
    IconEdit24,
    IconDelete24,
    Pagination,
    CenteredContent,
    InputField,
    CircularLoader,
    Button,
    IconMore24,
    Popper,
    MenuItem,
    Menu,
    IconDuplicate24,
    IconShare24,
    IconAdd24,
} from '@dhis2/ui';
import Sidebar from './components/Sidebar';
import './components/sidebar.css';
import EditElement from './components/EditElement';
import Form from './components/Form';

const pageSize = 10;

const myQuery = {
    results: {
        resource: 'dataElements',
        params: ({ page, sortField, sortDirection, searchQuery }) => ({
            pageSize,
            page,
            fields: ['id', 'displayName', 'domainType', 'valueType', 'categoryCombo[name]', 'lastUpdated', 'publicAccess'],
            order: `${sortField}:${sortDirection}`,
        }),
    },
};

const Home = () => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dataElementSearch, setDataElementSearch] = useState('');
    const [domainTypeSearch, setDomainTypeSearch] = useState('');
    const [valueTypeSearch, setValueTypeSearch] = useState('');
    const [dataSetSearch, setDataSetSearch] = useState('');
    const [categoryComboSearch, setCategoryComboSearch] = useState('');
    const [sortField, setSortField] = useState('displayName');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentView, setCurrentView] = useState('list');
    const [selectedDataElementId, setSelectedDataElementId] = useState(null);

    const { loading, error, data, refetch } = useDataQuery(myQuery, {
        variables: { page, sortField, sortDirection, searchQuery },
    });

    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader aria-label="Large Loader" large />
            </CenteredContent>
        );
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch({ page: newPage, sortField, sortDirection, searchQuery });
    };

    const toggleSelected = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
        );
    };

    const toggleAll = () => {
        if (selected.length === data.results.dataElements.length) {
            setSelected([]);
        } else {
            setSelected(data.results.dataElements.map((de) => de.id));
        }
    };

    const onSortIconClick = (field) => {
        const newSortDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newSortDirection);
        refetch({ sortField: field, sortDirection: newSortDirection, searchQuery });
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleAddNew = () => {
        setSelectedDataElementId(null); // No ID, since we're creating a new element
        setCurrentView('form');
    };

    const handleEdit = (id) => {
        setSelectedDataElementId(id); // Set the ID of the element to edit
        setCurrentView('form');
    };

    const handleSuccess = () => {
        setCurrentView('list');
    };

    const handleCancel = () => {
        setCurrentView('list');
    };

    return (
        <>
            <Sidebar />
            <div>
                <div className='header'>
                    <div className='breadcrumbs'>
                        <h2 className='header'>Data Element Management</h2>
                        <div className='filter-section'>
                            <InputField
                                value={dataElementSearch}
                                onChange={(e) => setDataElementSearch(e.target.value)}
                                type="search"
                                placeholder="Search data elements" />
                            <InputField
                                value={domainTypeSearch}
                                onChange={(e) => setDomainTypeSearch(e.target.value)}
                                type="search"
                                placeholder="Domain Type" />
                            <InputField
                                value={valueTypeSearch}
                                onChange={(e) => setValueTypeSearch(e.target.value)}
                                type="search"
                                placeholder="Value Type" />
                            <InputField
                                value={dataSetSearch}
                                onChange={(e) => setDataElementSearch(e.target.value)}
                                type="search"
                                placeholder="Data Set" />
                            <InputField
                                value={categoryComboSearch}
                                onChange={(e) => setCategoryComboSearch(e.target.value)}
                                type="search"
                                placeholder="Category combo" />
                            <Button>Clear all filters</Button>
                        </div>
                    </div>
                </div>
                <div className="action-buttons">
                    {currentView === 'list' && (
                        <Button icon={<IconAdd24 />} onClick={handleAddNew}>New</Button>
                    )}
                    <Button>Download</Button>
                    <Button>Manage View</Button>
                </div>
                <div className='table-container'>
                    {currentView === 'list' ? (
                        <DataTable>
                            <TableHead width="48px">
                                <DataTableRow>
                                    <DataTableColumnHeader>
                                        <Checkbox
                                            checked={selected.length === data.results.dataElements.length}
                                            onChange={toggleAll} />
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader
                                        name="displayName"
                                        onSortIconClick={() => onSortIconClick('displayName')}
                                        sortDirection={sortField === 'displayName' ? sortDirection : 'default'}
                                        sortIconTitle="Sort by displayName">
                                        Name
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader
                                        name="domainType"
                                        onSortIconClick={() => onSortIconClick('domainType')}
                                        sortDirection={sortField === 'domainType' ? sortDirection : 'default'}
                                        sortIconTitle="Sort by domainType">
                                        Domain Type
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader
                                        name="valueType"
                                        onSortIconClick={() => onSortIconClick('valueType')}
                                        sortDirection={sortField === 'valueType' ? sortDirection : 'default'}
                                        sortIconTitle="Sort by valueType">
                                        Value Type
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader
                                        name="categoryCombo"
                                        onSortIconClick={() => onSortIconClick('categoryCombo')}
                                        sortDirection={sortField === 'categoryCombo' ? sortDirection : 'default'}
                                        sortIconTitle="Sort by categoryCombo">
                                        Category Combo
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader
                                        name="Last Updated">
                                        Last Updated
                                    </DataTableColumnHeader>
                                    <DataTableColumnHeader>
                                        <IconSettings24 />
                                    </DataTableColumnHeader>
                                </DataTableRow>
                            </TableHead>
                            <TableBody>
                                {data.results.dataElements.map((dataElement) => (
                                    <DataTableRow key={dataElement.id}>
                                        <DataTableCell>
                                            <Checkbox
                                                checked={selected.includes(dataElement.id)}
                                                onChange={() => toggleSelected(dataElement.id)}
                                                value={dataElement.id} />
                                        </DataTableCell>
                                        <DataTableCell>{dataElement.displayName}</DataTableCell>
                                        <DataTableCell>{dataElement.domainType}</DataTableCell>
                                        <DataTableCell>{dataElement.valueType}</DataTableCell>
                                        <DataTableCell>{dataElement.categoryCombo.name}</DataTableCell>
                                        <DataTableCell>{dataElement.lastUpdated}</DataTableCell>
                                        <DataTableCell>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                <Button icon={<IconEdit24 />} onClick={() => handleEdit(dataElement.id)} />
                                                <Button icon={<IconMore24 />} />
                                            </div>
                                        </DataTableCell>
                                    </DataTableRow>
                                ))}
                            </TableBody>
                        </DataTable>
                    ) : (
                        <Form
                            dataElementId={selectedDataElementId}
                            onSuccess={handleSuccess}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
                <Pagination
                    page={page}
                    pageCount={Math.ceil(data.results.pager.total / pageSize)}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    className="pagination" />
            </div>
        </>
    );
};

export default Home;
