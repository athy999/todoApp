import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import GroceryApi from './api/appAPI';
import Paging from './Paging';
import SearchForm from './SearchForm';

function Grocery() {
    const [list,setList] = useState([]);
    
    const [name,setName] = useState(''); //value trong <input> form submit
    const [isEditing,setIsEditing] = useState(false);
    const [editID,setEditID] = useState(null);
    const [alert,setAlert] = useState({show:true,msg:"",type:""});

    const paramDefault = {
        keywords: "",
        PageNumber: 1,
        PageSize: 5,
    }
    //state param to send request changing page,search and fetch data at mounted
    const [param, setParam] = useState(paramDefault);

    //state pagination to store data pagination receive from response to used for changing page in <Paging/>
    const [pagination, setPagination] = useState({});  

    // GET data from server
    const getAllData = async () => {
        try {
            if(param.keywords !== "") {
                showAlert(true,`Search result for ${param.keywords}:`,"success")
            }
            if(alert.show) {}
            else{
                showAlert(true,"Loading...","loading");
            }
            let data = await GroceryApi.getAll(param);
            setList(data.items);
            setPagination(data.pagination);
        }
        catch (error){
            console.log("Fail to fetch");
            showAlert(true,"Fail to connect server, please retry later","danger");
        }
        showAlert(false);
    }

    useEffect( ()=> {
        getAllData();
    },[param])

    const handleSubmit = (e) => {
        e.preventDefault()
        const itemNameList = list.map( (item) => item.itemName);
        if(!name) {
            //name input empty
            showAlert(true,'Please enter item','danger');
        }
        else if (itemNameList.includes(name) && !isEditing) {
            //item duplicated
            showAlert(true,"Item already exist","danger");
        }       
        else if(name && isEditing) {
            //deal with edit name
            const putAPI = async () => {
                try {
                    showAlert(true,'Updating...','loading');
                    var itemUpdating =list.find((item)=> item.itemId === editID)
                    itemUpdating.itemName= name;
                    await GroceryApi.PutItem(itemUpdating);
                    showAlert(true,"Done updating",'success');
                    getAllData();
                }
                catch (error){
                    console.log("Fail to update");
                    showAlert(true,"Fail to update, please retry later","danger");
                }
            }
            putAPI();
            setName("")
            setEditID(null)
            setIsEditing(false)
        }
        else {
            //create new item
            const postAPI = async () => {
                try {
                    showAlert(true,'Waiting...','loading');
                    let itemId = await GroceryApi.PostItem({
                        itemName:name,
                        isDone:false,
                    });
                    showAlert(true,'New item added','success');
                    setParam(paramDefault);
                }
                catch (error){
                    console.log("fail create new item");
                    showAlert(true,"Fail to connect server, please retry later","danger");
                }
            }
            postAPI();
            setName("");
        }
    }

    const showAlert =(show=false,msg="",type="") => {
        setAlert({show,type,msg})
    }

    const editItemStatus = (itemId)=>{
        const putAPI = async () => {
            try {
                var itemUpdating =list.find((item)=> item.itemId === itemId)
                itemUpdating.isDone = itemUpdating.isDone? false:true;
                await GroceryApi.PutItem(itemUpdating);
            }
            catch (error){
                console.log("Fail update");
                showAlert(true,"Fail to update status, please retry later","danger");
            }
        }
        putAPI();
        getAllData();
    }
    const editItemName =(itemId,itemName) => {
        setIsEditing(true)
        setEditID(itemId)
        setName(itemName)
    }

    const removeItem = (itemId) => {
        
        const deleteAPI = async () => {
            try {
                await GroceryApi.DeleteItem(itemId);
                showAlert(true,"Item removed","danger");
                setParam(paramDefault);
            }
            catch (error){
                console.log("Fail delete");
                showAlert(true,"Fail to delete, please retry later","danger");
                setParam(paramDefault);
            }
        }
        deleteAPI();
    }

    return (
        <>
        <section className='alert-section'>
            {alert.show && <Alert {...alert} removeAlert ={showAlert} list={list}/>}
        </section>
        <section className='section-center'>
            <form className="grocery-form" onSubmit={handleSubmit}>
                <h3>Grocery List</h3>
                <div className='form-control'>
                    <input 
                        className='grocery' 
                        placeholder='e.g. Eggs'
                        value={name||""}
                        onChange={ (e)=> setName(e.target.value)}
                    ></input>
                    <button type='submit' className='submit-btn'>
                        {isEditing?"EDIT":"SUBMIT"}
                    </button>
                </div>
            </form>

            <SearchForm setParam={setParam} />
            <div className='grocery-container'>
                <List 
                    items={list} 
                    removeItem={removeItem} 
                    editItemName={editItemName}
                    editItemStatus={editItemStatus} 
                    editID={editID}/>
                
            </div>
            <Paging pagination={pagination} setParam={setParam} />
        </section>
        </>
    )
        
}

export default Grocery
