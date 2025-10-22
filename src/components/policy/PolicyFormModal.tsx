import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BLOCK_ON_OPTIONS = [
  "data_leak",
  "context_poisoning",
  "jailbreak",
  "pii_exposure",
  "unauthorized_tool"
];

export default function PolicyFormModal({ policy, onClose }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(policy || {
    name: "",
    description: "",
    enabled: true,
    version: "1.0",
    block_on: [],
    allowed_tool_names: [],
    allowed_url_domains: [],
    pii_patterns: "strict",
    deterministic_only: false,
    max_tokens: 4096,
  });

  const [toolInput, setToolInput] = useState("");
  const [domainInput, setDomainInput] = useState("");

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (policy) {
        return base44.entities.Policy.update(policy.id, data);
      }
      return base44.entities.Policy.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const toggleBlockOn = (option) => {
    const current = formData.block_on || [];
    if (current.includes(option)) {
      setFormData({ ...formData, block_on: current.filter(o => o !== option) });
    } else {
      setFormData({ ...formData, block_on: [...current, option] });
    }
  };

  const addTool = () => {
    if (toolInput.trim()) {
      setFormData({
        ...formData,
        allowed_tool_names: [...(formData.allowed_tool_names || []), toolInput.trim()]
      });
      setToolInput("");
    }
  };

  const addDomain = () => {
    if (domainInput.trim()) {
      setFormData({
        ...formData,
        allowed_url_domains: [...(formData.allowed_url_domains || []), domainInput.trim()]
      });
      setDomainInput("");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{policy ? 'Edit Policy' : 'Create New Policy'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Policy Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Production Security Policy"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this policy does..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Version</Label>
              <Input
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="1.0"
              />
            </div>

            <div className="space-y-2">
              <Label>PII Detection Level</Label>
              <Select
                value={formData.pii_patterns}
                onValueChange={(value) => setFormData({ ...formData, pii_patterns: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lenient">Lenient</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="strict">Strict</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Block On (Select violation types that trigger blocking)</Label>
            <div className="space-y-2">
              {BLOCK_ON_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    checked={(formData.block_on || []).includes(option)}
                    onCheckedChange={() => toggleBlockOn(option)}
                  />
                  <label className="text-sm">{option.replace(/_/g, ' ')}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allowed Tool Names</Label>
            <div className="flex gap-2">
              <Input
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder="e.g. search, calculator"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
              />
              <Button type="button" onClick={addTool}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.allowed_tool_names || []).map((tool, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 rounded text-sm">
                  {tool}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      allowed_tool_names: formData.allowed_tool_names.filter((_, i) => i !== index)
                    })}
                    className="ml-2 text-red-500"
                  >×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Allowed URL Domains</Label>
            <div className="flex gap-2">
              <Input
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g. example.com"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDomain())}
              />
              <Button type="button" onClick={addDomain}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.allowed_url_domains || []).map((domain, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 rounded text-sm">
                  {domain}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      allowed_url_domains: formData.allowed_url_domains.filter((_, i) => i !== index)
                    })}
                    className="ml-2 text-red-500"
                  >×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : 'Save Policy'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}