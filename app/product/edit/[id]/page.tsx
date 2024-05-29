'use client';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation';

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>({});
    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async() => {
        await axios.get('/product/api/'+id).then((res) => {
            console.log("Product Data", res.data);
            setProduct(res.data[0]);
        })
    }

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('Name', nameRef.current?.value?.toString() || '');
        formData.append('BuyPrice', buyPriceRef.current?.value?.toString() || '');
        formData.append('SellPrice', sellPriceRef.current?.value?.toString() || '');
        formData.append('id', id.toString());

        await axios.patch('/product/api', formData).then((res) => {
            console.log("Save Data", res.data);
            window.location.href = "/product/";
        });
    }


    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Edit Product</IonTitle>
                        <IonButtons slot="end">
                            <IonButton expand="block" onClick={handleSave}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonInput
                            value={product?.Name}
                            type="text"
                            label="Name"
                            labelPlacement="fixed"
                            placeholder="Name"
                            ref={nameRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            value={product?.BuyPrice}
                            type="number"
                            label="Buy Price"
                            labelPlacement="floating"
                            placeholder="Buy Price"
                            ref={buyPriceRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            value={product?.SellPrice}
                            type="number"
                            label="Sell Price"
                            labelPlacement="stacked"
                            placeholder="Sell Price"
                            ref={sellPriceRef}
                        />
                    </IonItem>
                </IonContent>
            </IonPage>
        </div>
    )
}