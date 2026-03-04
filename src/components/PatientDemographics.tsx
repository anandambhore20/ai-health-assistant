import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Scale, Ruler, Heart, Pill, Droplets, Thermometer, Activity } from "lucide-react";

interface PatientData {
  age: string;
  gender: string;
  pregnancyStatus: string;
  bloodGroup: string;
  weight: string;
  weightUnit: string;
  height: string;
  heightUnit: string;
  medicalHistory: string[];
  medications: string;
  symptomDuration: string;
  // Vital Signs (optional)
  bodyTemperature: string;
  temperatureUnit: string;
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  oxygenSaturation: string;
  heartRate: string;
  respiratoryRate: string;
  bloodSugarLevel: string;
}

interface PatientDemographicsProps {
  patientData: PatientData;
  onPatientDataChange: (data: PatientData) => void;
}

const medicalHistoryOptions = [
  "Diabetes",
  "Hypertension", 
  "Heart Disease",
  "Asthma",
  "Allergies",
  "Cancer",
  "Mental Health Conditions",
  "Kidney Disease",
  "Liver Disease",
  "Thyroid Disease",
  "Autoimmune Disease",
  "None",
  "Other"
];

const PatientDemographics = ({ patientData, onPatientDataChange }: PatientDemographicsProps) => {
  const updateField = (field: keyof PatientData, value: any) => {
    onPatientDataChange({ ...patientData, [field]: value });
  };

  const toggleMedicalHistory = (condition: string) => {
    const current = patientData.medicalHistory;
    const updated = current.includes(condition)
      ? current.filter(c => c !== condition)
      : [...current, condition];
    updateField('medicalHistory', updated);
  };

  const calculateBMI = () => {
    const weightKg = patientData.weightUnit === 'lbs' 
      ? parseFloat(patientData.weight) * 0.453592 
      : parseFloat(patientData.weight);
    
    let heightM = 0;
    if (patientData.heightUnit === 'ft-in') {
      const [feet, inches = 0] = patientData.height.split('-').map(v => parseFloat(v) || 0);
      heightM = (feet * 12 + inches) * 0.0254;
    } else {
      heightM = parseFloat(patientData.height) / 100;
    }
    
    if (weightKg && heightM) {
      const bmi = weightKg / (heightM * heightM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getTemperatureStatus = () => {
    const temp = parseFloat(patientData.bodyTemperature);
    if (!temp) return null;
    const tempC = patientData.temperatureUnit === 'F' ? (temp - 32) * 5/9 : temp;
    if (tempC < 35) return { label: "Low (Hypothermia)", color: "text-blue-600" };
    if (tempC <= 37.2) return { label: "Normal", color: "text-green-600" };
    if (tempC <= 38) return { label: "Low-grade fever", color: "text-yellow-600" };
    if (tempC <= 39) return { label: "Moderate fever", color: "text-orange-600" };
    return { label: "High fever", color: "text-red-600" };
  };

  const getBPStatus = () => {
    const sys = parseInt(patientData.bloodPressureSystolic);
    const dia = parseInt(patientData.bloodPressureDiastolic);
    if (!sys || !dia) return null;
    if (sys < 90 || dia < 60) return { label: "Low", color: "text-blue-600" };
    if (sys <= 120 && dia <= 80) return { label: "Normal", color: "text-green-600" };
    if (sys <= 139 || dia <= 89) return { label: "Elevated", color: "text-yellow-600" };
    return { label: "High", color: "text-red-600" };
  };

  const getSpO2Status = () => {
    const spo2 = parseInt(patientData.oxygenSaturation);
    if (!spo2) return null;
    if (spo2 >= 95) return { label: "Normal", color: "text-green-600" };
    if (spo2 >= 90) return { label: "Low", color: "text-yellow-600" };
    return { label: "Critical", color: "text-red-600" };
  };

  const bmi = calculateBMI();
  const tempStatus = getTemperatureStatus();
  const bpStatus = getBPStatus();
  const spo2Status = getSpO2Status();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5 text-blue-600" />
          <span>Patient Demographics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Age</span>
            </Label>
            <Input
              id="age"
              type="number"
              min="0"
              max="120"
              placeholder="Enter age"
              value={patientData.age}
              onChange={(e) => updateField('age', e.target.value)}
            />
          </div>
          
          <div>
            <Label className="flex items-center space-x-2 mb-3">
              <User className="h-4 w-4" />
              <span>Gender</span>
            </Label>
            <RadioGroup 
              value={patientData.gender} 
              onValueChange={(value) => updateField('gender', value)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Pregnancy Status (for females) */}
        {patientData.gender === 'female' && (
          <div>
            <Label className="flex items-center space-x-2 mb-3">
              <Heart className="h-4 w-4" />
              <span>Pregnancy Status</span>
            </Label>
            <RadioGroup 
              value={patientData.pregnancyStatus} 
              onValueChange={(value) => updateField('pregnancyStatus', value)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not-pregnant" id="not-pregnant" />
                <Label htmlFor="not-pregnant">Not pregnant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="possibly-pregnant" id="possibly-pregnant" />
                <Label htmlFor="possibly-pregnant">Possibly pregnant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confirmed-pregnant" id="confirmed-pregnant" />
                <Label htmlFor="confirmed-pregnant">Confirmed pregnant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsure" id="unsure" />
                <Label htmlFor="unsure">Unsure</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Blood Group */}
        <div>
          <Label className="flex items-center space-x-2">
            <Droplets className="h-4 w-4" />
            <span>Blood Group</span>
          </Label>
          <Select value={patientData.bloodGroup} onValueChange={(value) => updateField('bloodGroup', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
              <SelectItem value="Unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Physical Measurements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center space-x-2">
              <Scale className="h-4 w-4" />
              <span>Weight</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Weight"
                value={patientData.weight}
                onChange={(e) => updateField('weight', e.target.value)}
                className="flex-1"
              />
              <Select value={patientData.weightUnit} onValueChange={(value) => updateField('weightUnit', value)}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="flex items-center space-x-2">
              <Ruler className="h-4 w-4" />
              <span>Height</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Height"
                value={patientData.height}
                onChange={(e) => updateField('height', e.target.value)}
                className="flex-1"
              />
              <Select value={patientData.heightUnit} onValueChange={(value) => updateField('heightUnit', value)}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="ft-in">ft-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {bmi && (
              <p className="text-sm text-gray-600 mt-1">BMI: {bmi}</p>
            )}
          </div>
        </div>

        {/* Vital Signs Section */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-red-500" />
            <h3 className="text-base font-semibold text-gray-900">Vital Signs</h3>
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-200">Optional</Badge>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Providing vitals helps the AI give more accurate assessments. Leave blank if you don't have these readings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Body Temperature */}
            <div>
              <Label className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span>Body Temperature</span>
              </Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="0.1"
                  placeholder={patientData.temperatureUnit === 'F' ? "98.6" : "37.0"}
                  value={patientData.bodyTemperature}
                  onChange={(e) => updateField('bodyTemperature', e.target.value)}
                  className="flex-1"
                />
                <Select value={patientData.temperatureUnit} onValueChange={(value) => updateField('temperatureUnit', value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C">°C</SelectItem>
                    <SelectItem value="F">°F</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {tempStatus && (
                <p className={`text-xs mt-1 font-medium ${tempStatus.color}`}>{tempStatus.label}</p>
              )}
            </div>

            {/* Blood Pressure */}
            <div>
              <Label className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Blood Pressure (mmHg)</span>
              </Label>
              <div className="flex space-x-1 items-center">
                <Input
                  type="number"
                  placeholder="120"
                  value={patientData.bloodPressureSystolic}
                  onChange={(e) => updateField('bloodPressureSystolic', e.target.value)}
                  className="flex-1"
                />
                <span className="text-gray-400 font-bold">/</span>
                <Input
                  type="number"
                  placeholder="80"
                  value={patientData.bloodPressureDiastolic}
                  onChange={(e) => updateField('bloodPressureDiastolic', e.target.value)}
                  className="flex-1"
                />
              </div>
              {bpStatus && (
                <p className={`text-xs mt-1 font-medium ${bpStatus.color}`}>{bpStatus.label}</p>
              )}
            </div>

            {/* Oxygen Saturation */}
            <div>
              <Label className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span>SpO₂ (%)</span>
              </Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="98"
                value={patientData.oxygenSaturation}
                onChange={(e) => updateField('oxygenSaturation', e.target.value)}
              />
              {spo2Status && (
                <p className={`text-xs mt-1 font-medium ${spo2Status.color}`}>{spo2Status.label}</p>
              )}
            </div>

            {/* Heart Rate */}
            <div>
              <Label className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-pink-500" />
                <span>Heart Rate (bpm)</span>
              </Label>
              <Input
                type="number"
                placeholder="72"
                value={patientData.heartRate}
                onChange={(e) => updateField('heartRate', e.target.value)}
              />
              {patientData.heartRate && (
                <p className={`text-xs mt-1 font-medium ${
                  parseInt(patientData.heartRate) < 60 ? 'text-blue-600' :
                  parseInt(patientData.heartRate) <= 100 ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {parseInt(patientData.heartRate) < 60 ? 'Bradycardia' :
                   parseInt(patientData.heartRate) <= 100 ? 'Normal' : 'Tachycardia'}
                </p>
              )}
            </div>

            {/* Respiratory Rate */}
            <div>
              <Label className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-teal-500" />
                <span>Respiratory Rate (breaths/min)</span>
              </Label>
              <Input
                type="number"
                placeholder="16"
                value={patientData.respiratoryRate}
                onChange={(e) => updateField('respiratoryRate', e.target.value)}
              />
              {patientData.respiratoryRate && (
                <p className={`text-xs mt-1 font-medium ${
                  parseInt(patientData.respiratoryRate) >= 12 && parseInt(patientData.respiratoryRate) <= 20
                    ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {parseInt(patientData.respiratoryRate) >= 12 && parseInt(patientData.respiratoryRate) <= 20
                    ? 'Normal' : 'Abnormal'}
                </p>
              )}
            </div>

            {/* Blood Sugar */}
            <div>
              <Label className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-purple-500" />
                <span>Blood Sugar (mg/dL)</span>
              </Label>
              <Input
                type="number"
                placeholder="100"
                value={patientData.bloodSugarLevel}
                onChange={(e) => updateField('bloodSugarLevel', e.target.value)}
              />
              {patientData.bloodSugarLevel && (
                <p className={`text-xs mt-1 font-medium ${
                  parseInt(patientData.bloodSugarLevel) < 70 ? 'text-red-600' :
                  parseInt(patientData.bloodSugarLevel) <= 140 ? 'text-green-600' :
                  parseInt(patientData.bloodSugarLevel) <= 200 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {parseInt(patientData.bloodSugarLevel) < 70 ? 'Low (Hypoglycemia)' :
                   parseInt(patientData.bloodSugarLevel) <= 140 ? 'Normal' :
                   parseInt(patientData.bloodSugarLevel) <= 200 ? 'Elevated' : 'High'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div>
          <Label className="text-base font-medium mb-3 block">Medical History</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {medicalHistoryOptions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={`history-${condition}`}
                  checked={patientData.medicalHistory.includes(condition)}
                  onCheckedChange={() => toggleMedicalHistory(condition)}
                />
                <Label htmlFor={`history-${condition}`} className="text-sm cursor-pointer">
                  {condition}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div>
          <Label htmlFor="medications" className="flex items-center space-x-2">
            <Pill className="h-4 w-4" />
            <span>Current Medications</span>
          </Label>
          <Textarea
            id="medications"
            placeholder="List all current medications or write 'None'"
            value={patientData.medications}
            onChange={(e) => updateField('medications', e.target.value)}
            rows={3}
          />
        </div>

        {/* Symptom Duration */}
        <div>
          <Label className="text-base font-medium mb-2 block">Duration of Current Symptoms</Label>
          <Select value={patientData.symptomDuration} onValueChange={(value) => updateField('symptomDuration', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select symptom duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="less-than-24h">Less than 24 hours</SelectItem>
              <SelectItem value="1-3-days">1-3 days</SelectItem>
              <SelectItem value="4-7-days">4-7 days</SelectItem>
              <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
              <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
              <SelectItem value="1-3-months">1-3 months</SelectItem>
              <SelectItem value="more-than-3-months">More than 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDemographics;
export type { PatientData };
