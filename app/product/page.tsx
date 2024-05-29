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

    const handleView = async(item: any) => {
        window.location.href = "/product/view/" + item?.id
    }
    
    const handleEdit = async(item: any) => {
        window.location.href = "/product/edit/" + item?.id
    }
    return (
        <IonPage>
            <IonContent>
                {
                    products.map((item: any, index: number) => (
                        <IonItem key={index}>{item?.Name}
                        <IonButtons slot='end'>
                            <IonButton onClick={() => handleView(item)} fill='outline'>View</IonButton>
                            <IonButton onClick={() => handleEdit(item)} fill='outline'>Edit</IonButton>
                            <IonButton onClick={() => handleDelete(item)} fill='outline'>Delete</IonButton>
                        </IonButtons>
                        </IonItem>
                    ))
                }
            </IonContent>
        </IonPage>
    );
}