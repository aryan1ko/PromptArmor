import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="mb-4 hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}