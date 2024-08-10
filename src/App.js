import React from 'react'
import classes from './App.module.css'
import Form from './components/Form';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditElement from './components/EditElement';
import Sidebar from './components/Sidebar';
import DeleteElement from './components/DeleteElement';
import './App.module.css';
import GroupForm from './dataElementGroup/GroupForm';
import EditElementGroup from './dataElementGroup/EditGroup';
import Overview from './dataElementGroup/GroupHome';


const MyApp = () => (
        <Router>
             <div className='app-container'>
            {/* <Sidebar /> */}
            <div className='main-content'>
            </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/data-elements" element={<Home />} />
                    <Route path="/add/new" element={<Form />} />
                    <Route path="/edit/:id" element={<EditElement />} />
                    <Route path="/delete/:id" element={<DeleteElement />} />

                    {/* data elements Group paths */}
                    <Route path="/data-elements/groups" element={<Overview />} />
                    <Route path="/add/newGroup" element={<GroupForm />} />
                    <Route path="/edit/:id" element={<EditElementGroup />} />


                    {/* <Route path='/*' element={<ErrorPage />} /> */}
                    <Route path="/overview" element={<Home />} />
                    <Route path="/data-elements/overview" element={<Home />} />
                    <Route path="/data-elements/group-sets" element={<Overview />} />
                </Routes>    
                </div>      
        </Router>
    // </div>
)

export default MyApp






// <DataQuery query={query}>
//             {({ error, loading, data }) => {
//                 if (error) return <span>ERROR</span>
//                 if (loading) return <span>...</span>
//                 return (
//                     <>
//                         <h1>
//                             {i18n.t('Hello {{name}}', { name: data.me.name })}
//                         </h1>
//                         <h3>{i18n.t('Welcome to DHIS2!')}</h3>
//                     </>
//                 )
//             }}
//         </DataQuery>