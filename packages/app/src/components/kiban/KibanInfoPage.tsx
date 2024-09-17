import { Content, PageWithHeader } from '@backstage/core-components';
import React from 'react';

export const KibanInfoPage = () => {
    return (
        <PageWithHeader title='What is Kiban (Local)?' themeId="home">
            <Content>
                Kiban is a DevOps Super Accelerator, providing a catalogue of software templates used to create and deploy a wide range of full software-life-cycle implementations.
                <br />
                These are designed with best practice in mind, supporting a range of source code repository services as well as CICD implementations so that they can be tailored to specific customer's needs.
                <br />
                Kiban is built on top of Kubernetes using Rafay, allowing the deployment of the full stack of tools to anywhere a customer runs a Kubernetes cluster.
                <br /><br />
                Kiban (Local) runs locally on a laptop to allow experimentation and development for NTT Data Engineers.
            </Content>
        </PageWithHeader>
    );
};
