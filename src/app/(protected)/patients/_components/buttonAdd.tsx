'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpsertPatientForm from './upsertPatientForm';
// import { Container } from './styles';

const ButtonAdd = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>
    <PlusIcon />
    Adicionar paciente
  </Button>
        </DialogTrigger>
        <DialogContent>
            <UpsertPatientForm/>
        </DialogContent>
    </Dialog>


  ) 
}

export default ButtonAdd;