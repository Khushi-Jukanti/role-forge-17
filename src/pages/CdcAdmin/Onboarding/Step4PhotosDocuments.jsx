import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

export default function Step4PhotosDocuments({ data, onUpdate, onNext, onBack }) {
  const [photos, setPhotos] = useState(data.photos || []);
  const [license, setLicense] = useState(data.license || { number: '', documents: [] });

  const addPhoto = () => {
    setPhotos([...photos, `https://images.unsplash.com/photo-${Date.now()}?w=400`]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const addDocument = () => {
    setLicense({
      ...license,
      documents: [...license.documents, `license_doc_${Date.now()}.pdf`]
    });
  };

  const removeDocument = (index) => {
    setLicense({
      ...license,
      documents: license.documents.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    onUpdate({ photos, license });
    onNext();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos & Documents</CardTitle>
        <p className="text-sm text-muted-foreground">Upload CDC photos and license documents</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* License Information */}
        <div className="space-y-4">
          <Label>License Number</Label>
          <Input
            value={license.number}
            onChange={(e) => setLicense({ ...license, number: e.target.value })}
            placeholder="Enter license number"
          />
        </div>

        {/* License Documents */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>License Documents</Label>
            <Button variant="outline" size="sm" onClick={addDocument}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
          <div className="space-y-2">
            {license.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm">{doc}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CDC Photos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>CDC Photos</Label>
            <Button variant="outline" size="sm" onClick={addPhoto}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center border">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
