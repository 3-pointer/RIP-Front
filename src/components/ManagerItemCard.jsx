import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { setProducts } from '../store/reducers/productReducer';

export const ManagerItemCard = (props) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(props.name);
    const [newManufacturer, setNewManufacturer] = useState(props.manufacturer);
    const [newDescription, setNewDescription] = useState(props.description);
    const [newPrice, setNewPrice] = useState(props.price);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        if (!!newName && !!newManufacturer && !!newDescription && !!newPrice) {
            const values = {
                name: newName,
                manufacturer: newManufacturer,
                price: +newPrice,
                description: newDescription,
            };
            await axiosInstance.put(`items/${props.id_item}/`, values).then(async () => {
                await axiosInstance.get('items-depth').then((response) => dispatch(setProducts(response?.data)));
            });
        }
    };

    const handleDelete = async () => {
        const values = {
            id_item: props.id_item,
            name: props.name,
            description: props.description,
            manufacturer: props.manufacturer,
            price: props.price,
            photo: props.photo,
        };
        await axiosInstance.delete(`items/${props.id_item}/`, values).then(async () => {
            await axiosInstance.get('items-depth').then((response) => dispatch(setProducts(response?.data)));
        });
    };

    const handleNavigate = () => {
        navigate(`/product/${props.id_item}`);
    };

    return (
        <div className='p-8 border md:w-[560px] flex flex-col justify-center items-center cursor-pointer my-8'>
            <img src={props.photo} alt={props.name} className='w-80 object-contain' onClick={handleNavigate} />
            <div className='flex flex-col justify-between'>
                <div>
                    <p className='font-bold'>Название: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <p className='font-bold'>Описание: </p>
                    <textarea
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <p className='font-bold'>Страна производителя: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newManufacturer}
                        onChange={(e) => setNewManufacturer(e.target.value)}
                    />
                    <p className='font-bold'>Стоимость: </p>
                    <input type='number' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    <button onClick={handleUpdate} className='bg-green-400 px-10 py-1 mt-2 w-full  rounded-md'>
                        Сохранить
                    </button>
                    <button onClick={handleDelete} className='bg-red-400 text-white px-10 py-1 mt-2 w-full  rounded-md'>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};
