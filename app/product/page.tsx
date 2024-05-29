'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { IonPage, IonContent, IonItem, IonButtons, IonButton } from '@ionic/react';

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

    const handleDelete = async(item: any) => {
        console.log(item.id);
        await axios.delete('/product/api/' + item?.id).then((res) => {
            console.log("Delete Data", res.data);
            getProducts();
        });
    }
    return (
        <IonPage>
            <IonContent>
                {
                    products.map((item: any, index: number) => (
                        <IonItem key={index}>{item?.Name}
                        <IonButtons slot='end'>
                            <IonButton onClick={() => handleDelete(item)}>Delete</IonButton>
                        </IonButtons>
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    );
}