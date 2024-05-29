'use client';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from 'axios';
import React, { useRef } from "react";


export default function AddProductPage() {
    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('Name', nameRef.current?.value?.toString() || '');
        formData.append('BuyPrice', buyPriceRef.current?.value?.toString() || '');
        formData.append('SellPrice', sellPriceRef.current?.value?.toString() || '');

        await axios.post('/product/api', formData).then((res) => {
            console.log("Save Data", res.data);
            if (res.data.status != "error") {
                window.location.href = "/product";
            } else {
                alert(res.data.error)
            }
        });
    }


    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Add Product</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={handleSave}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonInput
                            type="text"
                            label="Name"
                            labelPlacement="stacked"
                            placeholder="Name"
                            ref={nameRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="number"
                            label="Buy Price"
                            labelPlacement="stacked"
                            placeholder="Buy Price"
                            ref={buyPriceRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
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