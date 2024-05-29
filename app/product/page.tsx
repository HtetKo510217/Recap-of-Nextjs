'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { IonPage, IonContent, IonItem } from '@ionic/react';

export default function ProductPage() { 

    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () =>
        axios.get('/product/api').then((res) => {
            console.log("Product Data", res.data);
            setProducts(res.data);
        });

    return (
        <IonPage>
            <IonContent>
                {
                    products.map((item: any, index: number) => (
                        <IonItem key={index}>{item?.Name}</IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    );
}