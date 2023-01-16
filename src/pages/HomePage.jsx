import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../api';
import { ProductCard } from '../components/ProductCard';
import { setProducts } from '../store/reducers/productReducer';

export const HomePage = () => {
    const { products } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const [q, setQ] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            await axiosInstance
                .get('items-depth', { params: value })
                .then((response) => dispatch(setProducts(response?.data)));
        };

        fetchProducts();
    }, [dispatch, value]);

    const handleReset = () => {
        setQ('');
        setMax('');
        setMin('');
        setValue('');
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'>Главная</Link> <p>/</p>
            </div>
            <div>
                <div>
                    <p>Название</p>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='Название'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none'
                    />
                </div>
                <div>
                    <p>Минимальная стоимость</p>
                    <input
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder='Минимальная стоимость'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none'
                    />
                </div>
                <div>
                    <p>Максимальная стоимость</p>
                    <input
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder='Максимальная стоимость'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none'
                    />
                </div>
                <div className='mt-2 flex gap-2'>
                    <button
                        onClick={() => setValue({ q, min_cost: min, max_cost: max })}
                        className='py-1 px-4 bg-red-600 rounded-xl'
                    >
                        Искать
                    </button>
                    <button onClick={handleReset} className='py-1 px-4 bg-red-600 rounded-xl'>
                        Сбросить
                    </button>
                </div>
            </div>
            {products.length > 0 && (
                <div className='flex flex-wrap gap-4'>
                    {products.map((product) => (
                        <ProductCard key={product.id_item} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};
