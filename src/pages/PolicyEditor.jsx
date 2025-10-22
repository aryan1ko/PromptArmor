import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import BackButton from "../components/navigation/BackButton";
import PolicyFormModal from "../components/policy/PolicyFormModal.tsx";

export default function PolicyEditor() {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: policies = [], isLoading, error } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      try {
        return await base44.entities.Policy.list('-created_date');
      } catch (err) {
        console.error("Error loading policies:", err);
        return [];
      }
    },
    initialData: [],
    retry: 1,
  });

  const togglePolicyMutation = useMutation({
    mutationFn: ({ id, enabled }) => base44.entities.Policy.update(id, { enabled }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['policies'] }),
    onError: (err) => {
      console.error("Error toggling policy:", err);
      alert("Failed to update policy. Please try again.");
    }
  });

  const deletePolicyMutation = useMutation({
    mutationFn: (id) => base44.entities.Policy.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['policies'] }),
    onError: (err) => {
      console.error("Error deleting policy:", err);
      alert("Failed to delete policy. Please try again.");
    }
  });

  const handleEdit = (policy) => {
    setSelectedPolicy(policy);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedPolicy(null);
    setShowForm(true);
  };

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <BackButton />
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Policies</h3>
            <p className="text-muted-foreground">
              There was an error loading the policies. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Policy Editor</h1>
          <p className="text-muted-foreground">Manage security policies and rules</p>
        </div>
        <Button onClick={handleNew} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          New Policy
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Loading policies...
          </div>
        )}
        
        {!isLoading && policies.map((policy) => (
          <Card key={policy.id} className="bg-card border-border hover:border-emerald-500/50 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{policy.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Version {policy.version}</p>
                </div>
                <Switch
                  checked={policy.enabled}
                  onCheckedChange={(enabled) => 
                    togglePolicyMutation.mutate({ id: policy.id, enabled })
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{policy.description}</p>

              {policy.block_on && policy.block_on.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2">Blocks On:</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.block_on.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 hover:bg-emerald-500/10 hover:text-emerald-500"
                  onClick={() => handleEdit(policy)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this policy?')) {
                      deletePolicyMutation.mutate(policy.id);
                    }
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {!isLoading && policies.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No policies configured. Create your first policy to get started.
          </div>
        )}
      </div>

      {showForm && (
        <PolicyFormModal
          policy={selectedPolicy}
          onClose={() => {
            setShowForm(false);
            setSelectedPolicy(null);
          }}
        />
      )}
    </div>
  );
}