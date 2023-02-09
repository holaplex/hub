'use client';
import Link from 'next/link';
import DragDropImage from '../../components/DragDropImage';
import Card from '../../components/Card';
import Typography, { Size } from '../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';

export default function OrganizationPage() {
  const handleDrop = (file: File) => {
    console.log(file);
  };
  return (
    <Card className="w-[400px]">

    </Card>
  );
}
