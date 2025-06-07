'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import UpsertPatientForm from './upsertPatientForm';
// import { Container } from './styles';

const ButtonAdd = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button>
    <PlusIcon />
    Adicionar paciente
  </Button>
        </DialogTrigger>
        <DialogContent>
            <UpsertPatientForm onSuccess={()=> setIsOpen(false)}/>
        </DialogContent>
    </Dialog>


  ) 
}

export default ButtonAdd;