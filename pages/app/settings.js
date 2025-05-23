import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import { Settings, Save, Key, ShoppingCart, Truck, Check, Edit, Info, FileText, Package, UserSquare, FolderCog, ClipboardCopy } from 'lucide-react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

const InputField = ({ label, type = 'text', value, onChange, placeholder, id, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${disabled ? "bg-slate-50 text-slate-500" : ""}`}
    />
  </div>
);

const ApiSection = ({ title, icon: Icon, children, description }) => (
  <motion.div
    className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-6">
      {Icon && <Icon size={28} className="mr-3 text-blue-600" />}
      <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
    </div>
    {description && <p className="mb-4 text-sm text-slate-500">{description}</p>}
    <div className="space-y-4">
      {children}
    </div>
  </motion.div>
);

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [trendyolApiKey, setTrendyolApiKey] = useState('');
  const [isTrendyolApiKeyEditing, setIsTrendyolApiKeyEditing] = useState(true);
  const [trendyolApiKeySaveStatus, setTrendyolApiKeySaveStatus] = useState('idle');

  const [trendyolApiSecret, setTrendyolApiSecret] = useState('');
  const [isTrendyolApiSecretEditing, setIsTrendyolApiSecretEditing] = useState(true);
  const [trendyolApiSecretSaveStatus, setTrendyolApiSecretSaveStatus] = useState('idle');
  
  const [trendyolSupplierId, setTrendyolSupplierId] = useState('');
  const [isTrendyolSupplierIdEditing, setIsTrendyolSupplierIdEditing] = useState(true);
  const [trendyolSupplierIdSaveStatus, setTrendyolSupplierIdSaveStatus] = useState('idle');

  const [shippoApiToken, setShippoApiToken] = useState('');
  const [isShippoApiTokenEditing, setIsShippoApiTokenEditing] = useState(true);
  const [shippoApiTokenSaveStatus, setShippoApiTokenSaveStatus] = useState('idle');

  const [veeqoApiKey, setVeeqoApiKey] = useState('');
  const [isVeeqoApiKeyEditing, setIsVeeqoApiKeyEditing] = useState(true);
  const [veeqoApiKeySaveStatus, setVeeqoApiKeySaveStatus] = useState('idle');

  const [defaultCurrencyCode, setDefaultCurrencyCode] = useState('');
  const [isDefaultCurrencyCodeEditing, setIsDefaultCurrencyCodeEditing] = useState(true);
  const [defaultCurrencyCodeSaveStatus, setDefaultCurrencyCodeSaveStatus] = useState('idle');

  const [dutiesPaymentType, setDutiesPaymentType] = useState('');
  const [isDutiesPaymentTypeEditing, setIsDutiesPaymentTypeEditing] = useState(true);
  const [dutiesPaymentTypeSaveStatus, setDutiesPaymentTypeSaveStatus] = useState('idle');

  const [fedexAccountNumber, setFedexAccountNumber] = useState('');
  const [isFedexAccountNumberEditing, setIsFedexAccountNumberEditing] = useState(true);
  const [fedexAccountNumberSaveStatus, setFedexAccountNumberSaveStatus] = useState('idle');

  const [fedexApiKey, setFedexApiKey] = useState('');
  const [isFedexApiKeyEditing, setIsFedexApiKeyEditing] = useState(true);
  const [fedexApiKeySaveStatus, setFedexApiKeySaveStatus] = useState('idle');

  const [fedexApiSecret, setFedexApiSecret] = useState('');
  const [isFedexApiSecretEditing, setIsFedexApiSecretEditing] = useState(true);
  const [fedexApiSecretSaveStatus, setFedexApiSecretSaveStatus] = useState('idle');

  // IMPORTER_OF_RECORD States (New: Individual fields)
  const [importerContactPersonName, setImporterContactPersonName] = useState('');
  const [importerContactCompanyName, setImporterContactCompanyName] = useState('');
  const [importerContactPhoneNumber, setImporterContactPhoneNumber] = useState('');
  const [importerContactEmailAddress, setImporterContactEmailAddress] = useState('');
  const [importerAddressStreetLines, setImporterAddressStreetLines] = useState('');
  const [importerAddressCity, setImporterAddressCity] = useState('');
  const [importerAddressStateCode, setImporterAddressStateCode] = useState(''); // Numeric (e.g., 01 for Adana)
  const [importerAddressPostalCode, setImporterAddressPostalCode] = useState('');
  const [importerAddressCountryCode, setImporterAddressCountryCode] = useState('');
  
  // Combined save/edit state for the Importer of Record section
  const [isImporterSectionEditing, setIsImporterSectionEditing] = useState(true);
  const [importerSectionSaveStatus, setImporterSectionSaveStatus] = useState('idle');

  // Shipper Information States (These will be grouped under FedEx section)
  const [shipperCity, setShipperCity] = useState('');
  const [isShipperCityEditing, setIsShipperCityEditing] = useState(true);
  const [shipperCitySaveStatus, setShipperCitySaveStatus] = useState('idle');

  const [shipperCountryCode, setShipperCountryCode] = useState('');
  const [isShipperCountryCodeEditing, setIsShipperCountryCodeEditing] = useState(true);
  const [shipperCountryCodeSaveStatus, setShipperCountryCodeSaveStatus] = useState('idle');

  const [shipperName, setShipperName] = useState('');
  const [isShipperNameEditing, setIsShipperNameEditing] = useState(true);
  const [shipperNameSaveStatus, setShipperNameSaveStatus] = useState('idle');

  const [shipperPersonName, setShipperPersonName] = useState('');
  const [isShipperPersonNameEditing, setIsShipperPersonNameEditing] = useState(true);
  const [shipperPersonNameSaveStatus, setShipperPersonNameSaveStatus] = useState('idle');

  const [shipperPhoneNumber, setShipperPhoneNumber] = useState('');
  const [isShipperPhoneNumberEditing, setIsShipperPhoneNumberEditing] = useState(true);
  const [shipperPhoneNumberSaveStatus, setShipperPhoneNumberSaveStatus] = useState('idle');

  const [shipperPostalCode, setShipperPostalCode] = useState('');
  const [isShipperPostalCodeEditing, setIsShipperPostalCodeEditing] = useState(true);
  const [shipperPostalCodeSaveStatus, setShipperPostalCodeSaveStatus] = useState('idle');

  const [shipperStateCode, setShipperStateCode] = useState('');
  const [isShipperStateCodeEditing, setIsShipperStateCodeEditing] = useState(true);
  const [shipperStateCodeSaveStatus, setShipperStateCodeSaveStatus] = useState('idle');

  const [shipperStreet1, setShipperStreet1] = useState('');
  const [isShipperStreet1Editing, setIsShipperStreet1Editing] = useState(true);
  const [shipperStreet1SaveStatus, setShipperStreet1SaveStatus] = useState('idle');

  const [shipperStreet2, setShipperStreet2] = useState('');
  const [isShipperStreet2Editing, setIsShipperStreet2Editing] = useState(true);
  const [shipperStreet2SaveStatus, setShipperStreet2SaveStatus] = useState('idle');

  const [shipperTinNumber, setShipperTinNumber] = useState('');
  const [isShipperTinNumberEditing, setIsShipperTinNumberEditing] = useState(true);
  const [shipperTinNumberSaveStatus, setShipperTinNumberSaveStatus] = useState('idle');

  // New System Managed Settings State
  const [fedexFolderId, setFedexFolderId] = useState('');

  useEffect(() => {
    const fetchUserProperties = async () => {
      // ACTUAL IMPLEMENTATION: Call Next.js API route that calls Apps Script
      try {
        console.log('Fetching user properties from /api/gscript/get-all-user-properties');
        const response = await fetch('/api/gscript/get-all-user-properties'); 
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch settings. Status: ${response.status}. Response: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Fetched user properties:', data);

        // Set all states based on data from the API
        // Veeqo
        if (data.hasOwnProperty('VEEQO_API_KEY')) { 
          setVeeqoApiKey(data.VEEQO_API_KEY);
          setIsVeeqoApiKeyEditing(false);
          setVeeqoApiKeySaveStatus('success');
        }
        // General
        if (data.hasOwnProperty('DEFAULT_CURRENCY_CODE')) {
          setDefaultCurrencyCode(data.DEFAULT_CURRENCY_CODE);
          setIsDefaultCurrencyCodeEditing(false);
          setDefaultCurrencyCodeSaveStatus('success');
        }
        // Trendyol
        if (data.hasOwnProperty('TRENDYOL_API_KEY')) { 
          setTrendyolApiKey(data.TRENDYOL_API_KEY);
          setIsTrendyolApiKeyEditing(false);
          setTrendyolApiKeySaveStatus('success');
        }
        if (data.hasOwnProperty('TRENDYOL_API_SECRET')) { 
          setTrendyolApiSecret(data.TRENDYOL_API_SECRET);
          setIsTrendyolApiSecretEditing(false);
          setTrendyolApiSecretSaveStatus('success');
        }
        if (data.hasOwnProperty('TRENDYOL_SUPPLIER_ID')) { 
          setTrendyolSupplierId(data.TRENDYOL_SUPPLIER_ID);
          setIsTrendyolSupplierIdEditing(false);
          setTrendyolSupplierIdSaveStatus('success');
        }
        // Shippo
        if (data.hasOwnProperty('SHIPPO_TOKEN')) { 
          setShippoApiToken(data.SHIPPO_TOKEN);
          setIsShippoApiTokenEditing(false);
          setShippoApiTokenSaveStatus('success');
        }
        // Customs & Payment
        if (data.hasOwnProperty('DUTIES_PAYMENT_TYPE')) {
          setDutiesPaymentType(data.DUTIES_PAYMENT_TYPE);
          setIsDutiesPaymentTypeEditing(false);
          setDutiesPaymentTypeSaveStatus('success');
        }
        // FedEx API
        if (data.hasOwnProperty('FEDEX_ACCOUNT_NUMBER')) {
          setFedexAccountNumber(data.FEDEX_ACCOUNT_NUMBER);
          setIsFedexAccountNumberEditing(false);
          setFedexAccountNumberSaveStatus('success');
        }
        if (data.hasOwnProperty('FEDEX_API_KEY')) {
          setFedexApiKey(data.FEDEX_API_KEY);
          setIsFedexApiKeyEditing(false);
          setFedexApiKeySaveStatus('success');
        }
        if (data.hasOwnProperty('FEDEX_API_SECRET')) {
          setFedexApiSecret(data.FEDEX_API_SECRET);
          setIsFedexApiSecretEditing(false);
          setFedexApiSecretSaveStatus('success');
        }
        // Shipper Information (now individual fields for Importer of Record)
        if (data.hasOwnProperty('IMPORTER_OF_RECORD')) { 
          try {
            const importerData = JSON.parse(data.IMPORTER_OF_RECORD);
            if (importerData && importerData.contact && importerData.address) {
              setImporterContactPersonName(importerData.contact.personName || '');
              setImporterContactCompanyName(importerData.contact.companyName || '');
              setImporterContactPhoneNumber(importerData.contact.phoneNumber || '');
              setImporterContactEmailAddress(importerData.contact.emailAddress || '');
              setImporterAddressStreetLines(Array.isArray(importerData.address.streetLines) ? importerData.address.streetLines.join('\n') : importerData.address.streetLines || '');
              setImporterAddressCity(importerData.address.city || '');
              setImporterAddressStateCode(importerData.address.stateOrProvinceCode || '');
              setImporterAddressPostalCode(importerData.address.postalCode || '');
              setImporterAddressCountryCode(importerData.address.countryCode || '');
              
              setIsImporterSectionEditing(false);
              setImporterSectionSaveStatus('success');
            } else {
              // Data is malformed or incomplete, keep editable
              setIsImporterSectionEditing(true);
              setImporterSectionSaveStatus('idle');
            }
          } catch (e) {
            console.error("Error parsing IMPORTER_OF_RECORD JSON:", e);
            setIsImporterSectionEditing(true);
            setImporterSectionSaveStatus('idle');
          }
        }
        if (data.hasOwnProperty('SHIPPER_CITY')) { setShipperCity(data.SHIPPER_CITY); setIsShipperCityEditing(false); setShipperCitySaveStatus('success'); }
        if (data.hasOwnProperty('SHIPPER_COUNTRY_CODE')) { setShipperCountryCode(data.SHIPPER_COUNTRY_CODE); setIsShipperCountryCodeEditing(false); setShipperCountryCodeSaveStatus('success'); }
        if (data.hasOwnProperty('SHIPPER_POSTAL_CODE')) { setShipperPostalCode(data.SHIPPER_POSTAL_CODE); setIsShipperPostalCodeEditing(false); setShipperPostalCodeSaveStatus('success'); }
        if (data.hasOwnProperty('SHIPPER_STATE_CODE')) { setShipperStateCode(data.SHIPPER_STATE_CODE); setIsShipperStateCodeEditing(false); setShipperStateCodeSaveStatus('success'); }
        if (data.hasOwnProperty('SHIPPER_TIN_NUMBER')) { setShipperTinNumber(data.SHIPPER_TIN_NUMBER); setIsShipperTinNumberEditing(false); setShipperTinNumberSaveStatus('success'); }
        
        // System Managed Settings (FEDEX_FOLDER_ID)
        if (data.hasOwnProperty('FEDEX_FOLDER_ID')) {
          setFedexFolderId(data.FEDEX_FOLDER_ID);
        }

      } catch (error) {
        console.error("Error fetching user properties:", error);
        // TODO: Optionally set an error state to display a message to the user
        // For example: setPageErrorState('Ayarlar yüklenirken bir sorun oluştu.');
      }
    };

    if (status === 'authenticated') {
      fetchUserProperties();
    }
  }, [status]);

  const handleSaveProperty = async (propertyName, value, setSaveStatus, setIsEditing) => {
    setSaveStatus('saving');
    try {
      console.log(`Saving ${propertyName}: ${value} to user's script properties via Next.js API route`);
      const response = await fetch('/api/gscript/set-user-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id, propertyName, value }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to save property. Server response not JSON.' }));
        throw new Error(errorData.message || `Failed to save ${propertyName}. Status: ${response.status}`);
      }
      
      setSaveStatus('success');
      setIsEditing(false);

    } catch (error) {
      console.error(`Error saving ${propertyName}:`, error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSaveImporterOfRecord = async () => {
    setImporterSectionSaveStatus('saving');

    const importerFields = [
      importerContactPersonName, importerContactCompanyName, importerContactPhoneNumber, 
      importerContactEmailAddress, importerAddressStreetLines, importerAddressCity, 
      importerAddressStateCode, importerAddressPostalCode, importerAddressCountryCode
    ];

    const anyFieldHasValue = importerFields.some(field => field && String(field).trim() !== '');
    const allFieldsHaveValue = importerFields.every(field => field && String(field).trim() !== '');

    if (anyFieldHasValue && !allFieldsHaveValue) {
      alert('İthalatçı Kaydı (Importer of Record) bilgileri için, bir alan doldurulduysa tüm alanların doldurulması zorunludur.');
      setImporterSectionSaveStatus('error');
      setTimeout(() => setImporterSectionSaveStatus('idle'), 3000);
      return;
    }
    
    // If no fields have value, we can either save an empty object or not save at all.
    // For now, let's save an empty object if no fields are filled, or the user can clear them.
    // Or, we can prevent saving if all are empty unless explicitly intended.
    // For this implementation, if all are empty, we'll still proceed to save (which might clear the property or save it as empty based on backend).

    const importerJson = {
      contact: {
        personName: importerContactPersonName.trim(),
        companyName: importerContactCompanyName.trim(),
        phoneNumber: importerContactPhoneNumber.trim(),
        emailAddress: importerContactEmailAddress.trim(),
      },
      address: {
        streetLines: importerAddressStreetLines.trim().split('\n').map(line => line.trim()).filter(line => line), // Store as array of non-empty strings
        city: importerAddressCity.trim(),
        stateOrProvinceCode: importerAddressStateCode.trim(), // Numeric
        postalCode: importerAddressPostalCode.trim(),
        countryCode: importerAddressCountryCode.trim().toUpperCase(),
      }
    };

    await handleSaveProperty('IMPORTER_OF_RECORD', JSON.stringify(importerJson), setImporterSectionSaveStatus, setIsImporterSectionEditing);
  };

  const handleSaveShipperTinNumber = async () => {
    // First save SHIPPER_TIN_NUMBER
    await handleSaveProperty('SHIPPER_TIN_NUMBER', shipperTinNumber, setShipperTinNumberSaveStatus, setIsShipperTinNumberEditing);
    // Then, implicitly save SHIPPER_TIN_TYPE as 'BUSINESS_NATIONAL'
    // We need a dummy setSaveStatus and setIsEditing for this implicit save, or adjust handleSaveProperty not to require them if not interactive.
    // For simplicity, let's assume an immediate success/failure for the implicit part or ignore its specific UI feedback for now.
    try {
      console.log(`Implicitly saving SHIPPER_TIN_TYPE: BUSINESS_NATIONAL`);
      const response = await fetch('/api/gscript/set-user-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, propertyName: 'SHIPPER_TIN_TYPE', value: 'BUSINESS_NATIONAL' }),
      });
      if (!response.ok) {
        console.error('Failed to implicitly save SHIPPER_TIN_TYPE');
        // Optionally, set an error state or notify the user about this partial failure.
      } else {
        console.log('Successfully saved SHIPPER_TIN_TYPE implicitly');
      }
    } catch (error) {
      console.error('Error implicitly saving SHIPPER_TIN_TYPE:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('ID Kopyalandı!'); // Or use a more subtle toast notification
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Kopyalama başarısız oldu.');
    });
  };

  if (status === 'loading') {
    return <AppLayout title="Ayarlar Yükleniyor..."><div className="flex justify-center items-center h-screen"><p>Yükleniyor...</p></div></AppLayout>;
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return null;
  }

  return (
    <AppLayout title="API Ayarları - KolayXport">
      <NextSeo noindex={true} nofollow={true} />

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Settings size={36} className="mr-3 text-blue-600" />
            Entegrasyon Ayarları & Script Özellikleri
          </h1>
          <p className="mt-2 text-slate-600">
            Pazaryerleri, kargo servisleri ve diğer e-ticaret entegrasyonları için API anahtarlarınızı ve genel script ayarlarınızı buradan yönetebilirsiniz.
          </p>
        </div>
      </motion.div>

      <ApiSection title="Genel Ayarlar" icon={Settings} description="Uygulama genelinde kullanılacak temel ayarlar.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="defaultCurrencyCode"
              label="Varsayılan Para Birimi Kodu (Default Currency Code)"
              value={defaultCurrencyCode}
              onChange={(e) => setDefaultCurrencyCode(e.target.value)}
              placeholder="Örn: TRY, USD, EUR"
              disabled={!isDefaultCurrencyCodeEditing}
            />
          </div>
          {isDefaultCurrencyCodeEditing ? (
            <button
              onClick={() => handleSaveProperty('DEFAULT_CURRENCY_CODE', defaultCurrencyCode, setDefaultCurrencyCodeSaveStatus, setIsDefaultCurrencyCodeEditing)}
              disabled={defaultCurrencyCodeSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {defaultCurrencyCodeSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : defaultCurrencyCodeSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsDefaultCurrencyCodeEditing(true);
                setDefaultCurrencyCodeSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {defaultCurrencyCodeSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="Gümrük ve Ödeme Ayarları" icon={FileText} description="Gümrük işlemleri ve ödeme türü ile ilgili ayarlar.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="dutiesPaymentType"
              label="Gümrük Vergisi Ödeme Türü (Duties Payment Type)"
              value={dutiesPaymentType}
              onChange={(e) => setDutiesPaymentType(e.target.value)}
              placeholder="Örn: SENDER, RECIPIENT"
              disabled={!isDutiesPaymentTypeEditing}
            />
          </div>
          {isDutiesPaymentTypeEditing ? (
            <button
              onClick={() => handleSaveProperty('DUTIES_PAYMENT_TYPE', dutiesPaymentType, setDutiesPaymentTypeSaveStatus, setIsDutiesPaymentTypeEditing)}
              disabled={dutiesPaymentTypeSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {dutiesPaymentTypeSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : dutiesPaymentTypeSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsDutiesPaymentTypeEditing(true);
                setDutiesPaymentTypeSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {dutiesPaymentTypeSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="Trendyol API Bilgileri" icon={ShoppingCart} description="Trendyol mağazanız için API anahtar ve bilgileri.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="trendyolSupplierId"
              label="Trendyol Satıcı ID (Supplier ID)"
              value={trendyolSupplierId}
              onChange={(e) => setTrendyolSupplierId(e.target.value)}
              placeholder="123456"
              disabled={!isTrendyolSupplierIdEditing}
            />
          </div>
          {isTrendyolSupplierIdEditing ? (
            <button
              onClick={() => handleSaveProperty('TRENDYOL_SUPPLIER_ID', trendyolSupplierId, setTrendyolSupplierIdSaveStatus, setIsTrendyolSupplierIdEditing)}
              disabled={trendyolSupplierIdSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {trendyolSupplierIdSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : trendyolSupplierIdSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsTrendyolSupplierIdEditing(true);
                setTrendyolSupplierIdSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {trendyolSupplierIdSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>

        <div className="flex items-end space-x-2 mt-4">
          <div className="flex-grow">
            <InputField
              id="trendyolApiKey"
              label="Trendyol API Anahtarı (API Key)"
              value={trendyolApiKey}
              onChange={(e) => setTrendyolApiKey(e.target.value)}
              placeholder="ABC123XYZ789..."
              disabled={!isTrendyolApiKeyEditing}
            />
          </div>
          {isTrendyolApiKeyEditing ? (
            <button
              onClick={() => handleSaveProperty('TRENDYOL_API_KEY', trendyolApiKey, setTrendyolApiKeySaveStatus, setIsTrendyolApiKeyEditing)}
              disabled={trendyolApiKeySaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {trendyolApiKeySaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : trendyolApiKeySaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsTrendyolApiKeyEditing(true);
                setTrendyolApiKeySaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {trendyolApiKeySaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>

        <div className="flex items-end space-x-2 mt-4">
          <div className="flex-grow">
            <InputField
              id="trendyolApiSecret"
              label="Trendyol API Gizli Anahtarı (API Secret)"
              type="password"
              value={trendyolApiSecret}
              onChange={(e) => setTrendyolApiSecret(e.target.value)}
              placeholder="••••••••••••••••••••"
              disabled={!isTrendyolApiSecretEditing}
            />
          </div>
          {isTrendyolApiSecretEditing ? (
            <button
              onClick={() => handleSaveProperty('TRENDYOL_API_SECRET', trendyolApiSecret, setTrendyolApiSecretSaveStatus, setIsTrendyolApiSecretEditing)}
              disabled={trendyolApiSecretSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {trendyolApiSecretSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : trendyolApiSecretSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsTrendyolApiSecretEditing(true);
                setTrendyolApiSecretSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {trendyolApiSecretSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="Shippo API Bilgileri" icon={Package} description="Shippo kargo entegrasyonu için API token.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="shippoApiToken"
              label="Shippo Özel API Token (Private API Token)"
              type="password"
              value={shippoApiToken}
              onChange={(e) => setShippoApiToken(e.target.value)}
              placeholder="shippo_live_abcdef12345..."
              disabled={!isShippoApiTokenEditing}
            />
          </div>
          {isShippoApiTokenEditing ? (
            <button
              onClick={() => handleSaveProperty('SHIPPO_TOKEN', shippoApiToken, setShippoApiTokenSaveStatus, setIsShippoApiTokenEditing)}
              disabled={shippoApiTokenSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {shippoApiTokenSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : shippoApiTokenSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsShippoApiTokenEditing(true);
                setShippoApiTokenSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {shippoApiTokenSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="FedEx API Bilgileri" icon={Truck} description="FedEx kargo entegrasyonu için hesap, API ve gönderici bilgileri.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="fedexAccountNumber"
              label="FedEx Hesap Numarası (Account Number)"
              value={fedexAccountNumber}
              onChange={(e) => setFedexAccountNumber(e.target.value)}
              placeholder="FedEx Hesap Numaranız"
              disabled={!isFedexAccountNumberEditing}
            />
          </div>
          {isFedexAccountNumberEditing ? (
            <button
              onClick={() => handleSaveProperty('FEDEX_ACCOUNT_NUMBER', fedexAccountNumber, setFedexAccountNumberSaveStatus, setIsFedexAccountNumberEditing)}
              disabled={fedexAccountNumberSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {fedexAccountNumberSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : fedexAccountNumberSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsFedexAccountNumberEditing(true);
                setFedexAccountNumberSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {fedexAccountNumberSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>

        <div className="flex items-end space-x-2 mt-4">
          <div className="flex-grow">
            <InputField
              id="fedexApiKey"
              label="FedEx API Anahtarı (API Key)"
              type="password"
              value={fedexApiKey}
              onChange={(e) => setFedexApiKey(e.target.value)}
              placeholder="FedEx API Anahtarınız"
              disabled={!isFedexApiKeyEditing}
            />
          </div>
          {isFedexApiKeyEditing ? (
            <button
              onClick={() => handleSaveProperty('FEDEX_API_KEY', fedexApiKey, setFedexApiKeySaveStatus, setIsFedexApiKeyEditing)}
              disabled={fedexApiKeySaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {fedexApiKeySaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : fedexApiKeySaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsFedexApiKeyEditing(true);
                setFedexApiKeySaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {fedexApiKeySaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>

        <div className="flex items-end space-x-2 mt-4">
          <div className="flex-grow">
            <InputField
              id="fedexApiSecret"
              label="FedEx API Gizli Anahtarı (API Secret)"
              type="password"
              value={fedexApiSecret}
              onChange={(e) => setFedexApiSecret(e.target.value)}
              placeholder="FedEx API Gizli Anahtarınız"
              disabled={!isFedexApiSecretEditing}
            />
          </div>
          {isFedexApiSecretEditing ? (
            <button
              onClick={() => handleSaveProperty('FEDEX_API_SECRET', fedexApiSecret, setFedexApiSecretSaveStatus, setIsFedexApiSecretEditing)}
              disabled={fedexApiSecretSaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {fedexApiSecretSaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : fedexApiSecretSaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsFedexApiSecretEditing(true);
                setFedexApiSecretSaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {fedexApiSecretSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="İthalatçı Kaydı Detayları (Importer of Record Details)" icon={FileText} description="Gönderileriniz için ithalatçı firma/kişi bilgileri. Bir alan doldurulduysa tüm alanların doldurulması zorunludur.">
        <InputField
          id="importerContactCompanyName"
          label="Firma Adı"
          value={importerContactCompanyName}
          onChange={(e) => setImporterContactCompanyName(e.target.value)}
          placeholder="İthalatçı Firma Tam Adı"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerContactPersonName"
          label="Yetkili Kişi Adı"
          value={importerContactPersonName}
          onChange={(e) => setImporterContactPersonName(e.target.value)}
          placeholder="Adı Soyadı"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerContactPhoneNumber"
          label="Telefon Numarası"
          value={importerContactPhoneNumber}
          onChange={(e) => setImporterContactPhoneNumber(e.target.value)}
          placeholder="+90XXXXXXXXXX"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerContactEmailAddress"
          label="E-posta Adresi"
          type="email"
          value={importerContactEmailAddress}
          onChange={(e) => setImporterContactEmailAddress(e.target.value)}
          placeholder="eposta@ornek.com"
          disabled={!isImporterSectionEditing}
        />
        <div>
          <label htmlFor="importerAddressStreetLines" className="block text-sm font-medium text-slate-700 mb-1">
            Adres Satırları
          </label>
          <textarea
            id="importerAddressStreetLines"
            name="importerAddressStreetLines"
            rows={3}
            value={importerAddressStreetLines}
            onChange={(e) => setImporterAddressStreetLines(e.target.value)}
            placeholder="Mahalle, Cadde, Sokak, No (Yeni satır için Enter tuşunu kullanabilirsiniz)"
            disabled={!isImporterSectionEditing}
            className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${!isImporterSectionEditing ? "bg-slate-50 text-slate-500" : ""}`}
          />
        </div>
        <InputField
          id="importerAddressCity"
          label="Şehir"
          value={importerAddressCity}
          onChange={(e) => setImporterAddressCity(e.target.value)}
          placeholder="Örn: Adana"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerAddressStateCode"
          label="İl Kodu (Sayısal Plaka Kodu)"
          value={importerAddressStateCode}
          onChange={(e) => setImporterAddressStateCode(e.target.value)}
          placeholder="Örn: 01 (Adana için), 34 (İstanbul için)"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerAddressPostalCode"
          label="Posta Kodu"
          value={importerAddressPostalCode}
          onChange={(e) => setImporterAddressPostalCode(e.target.value)}
          placeholder="Örn: 01170"
          disabled={!isImporterSectionEditing}
        />
        <InputField
          id="importerAddressCountryCode"
          label="Ülke Kodu (ISO Alpha-2)"
          value={importerAddressCountryCode}
          onChange={(e) => setImporterAddressCountryCode(e.target.value.toUpperCase())}
          placeholder="Örn: TR, US"
          disabled={!isImporterSectionEditing}
        />
        <div className="flex justify-end mt-6">
          {isImporterSectionEditing ? (
            <button 
              onClick={handleSaveImporterOfRecord} 
              disabled={importerSectionSaveStatus === 'saving'}
              className="px-6 py-2.5 bg-orange-600 text-white font-semibold text-sm rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {importerSectionSaveStatus === 'saving' ? (<><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>) : importerSectionSaveStatus === 'error' ? (<>Hata! Tekrar Dene</>) : (<><Save size={16} className="mr-2" />İthalatçı Bilgilerini Kaydet</>)}
            </button>
          ) : (
            <button 
              onClick={() => { setIsImporterSectionEditing(true); setImporterSectionSaveStatus('idle'); }}
              className="px-6 py-2.5 bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> İthalatçı Bilgilerini Değiştir {importerSectionSaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      <ApiSection title="Veeqo API Bilgileri" icon={ShoppingCart} description="Veeqo envanter ve sipariş yönetimi entegrasyonu.">
        <div className="flex items-end space-x-2">
          <div className="flex-grow">
            <InputField
              id="veeqoApiKey"
              label="Veeqo API Anahtarı"
              type="password"
              value={veeqoApiKey}
              onChange={(e) => setVeeqoApiKey(e.target.value)}
              placeholder="Veeqo API anahtarınız"
              disabled={!isVeeqoApiKeyEditing}
            />
          </div>
          {isVeeqoApiKeyEditing ? (
            <button
              onClick={() => handleSaveProperty('VEEQO_API_KEY', veeqoApiKey, setVeeqoApiKeySaveStatus, setIsVeeqoApiKeyEditing)}
              disabled={veeqoApiKeySaveStatus === 'saving'}
              className="px-4 py-2 h-[38px] bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              {veeqoApiKeySaveStatus === 'saving' ? (
                <><Save size={16} className="mr-2 animate-spin" />Kaydediliyor...</>
              ) : veeqoApiKeySaveStatus === 'error' ? (
                <>Hata! Tekrar Dene</>
              ) : (
                <><Save size={16} className="mr-2" />Kaydet</>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsVeeqoApiKeyEditing(true);
                setVeeqoApiKeySaveStatus('idle');
              }}
              className="px-4 py-2 h-[38px] bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <Edit size={16} className="mr-2" /> Değiştir
              {veeqoApiKeySaveStatus === 'success' && <Check size={16} className="ml-2 text-green-500" />}
            </button>
          )}
        </div>
      </ApiSection>

      {/* System Managed Settings Section - NEW */}
      <ApiSection 
        title="Otomatik Ayarlar (Sistem)" 
        icon={FolderCog} 
        description="Bu ayarlar sistem tarafından yönetilir ve onboarding sırasında otomatik olarak oluşturulur."
      >
        {/* FEDEX_FOLDER_ID - Read-only */}
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <label htmlFor="fedexFolderIdDisplay" className="block text-sm font-medium text-slate-700 mb-1">
              FedEx Etiket Klasör ID (FedEx Label Folder ID)
            </label>
            <div 
              id="fedexFolderIdDisplay"
              className="mt-1 block w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm sm:text-sm text-slate-700 overflow-x-auto"
            >
              {fedexFolderId || "Yükleniyor veya ayarlanmamış..."}
            </div>
          </div>
          {fedexFolderId && (
            <button
              onClick={() => copyToClipboard(fedexFolderId)}
              title="Klasör ID'sini Kopyala"
              className="p-2 h-[38px] mt-6 bg-slate-200 text-slate-700 font-semibold text-sm rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 flex items-center justify-center whitespace-nowrap"
            >
              <ClipboardCopy size={18} />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Bu ID, FedEx kargo etiketlerinizin kaydedildiği Google Drive klasörünü belirtir. Onboarding sırasında otomatik oluşturulur.
        </p>
      </ApiSection>

    </AppLayout>
  );
} 