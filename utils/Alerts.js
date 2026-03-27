import Swal from 'sweetalert2';
import { Platform } from 'react-native';

const injectStyles = () => {
  if (Platform.OS === 'web' && !document.getElementById('swal-custom-styles')) {
    const style = document.createElement('style');
    style.id = 'swal-custom-styles';
    style.innerHTML = `
      .swal-custom-popup {
        border-radius: 16px !important;
        font-family: inherit !important;
        box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2) !important;
      }
      .swal-custom-title {
        color: #1e293b !important;
        font-size: 20px !important;
      }
      .swal-custom-confirm-btn {
        background-color: #002750 !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 10px 24px !important;
        font-size: 15px !important;
        font-weight: bold !important;
        margin: 5px !important;
        cursor: pointer !important;
        box-shadow: 0 4px 12px rgba(0, 39, 80, 0.3) !important;
      }
      .swal-custom-cancel-btn {
        background-color: #f1f5f9 !important;
        color: #475569 !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 10px 24px !important;
        font-size: 15px !important;
        font-weight: bold !important;
        margin: 5px !important;
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
  }
};

const getSwalOptions = (options) => {
  injectStyles();
  return {
    ...options,
    customClass: {
      popup: 'swal-custom-popup',
      title: 'swal-custom-title',
      confirmButton: 'swal-custom-confirm-btn',
      cancelButton: 'swal-custom-cancel-btn',
      ...options.customClass
    },
    buttonsStyling: false,
  };
};

export const showAlert = (title, text, icon = 'info') => {
  if (Platform.OS === 'web') {
    return Swal.fire(getSwalOptions({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar'
    }));
  } else {
    alert(`${title}\n${text}`);
  }
};

export const showConfirm = (title, text, confirmCallback) => {
  if (Platform.OS === 'web') {
    Swal.fire(getSwalOptions({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    })).then((result) => {
      if (result.isConfirmed && confirmCallback) {
        confirmCallback();
      }
    });
  } else {
    // Fallback native
    if (confirm(`${title}\n${text}`)) {
        if (confirmCallback) confirmCallback();
    }
  }
};
