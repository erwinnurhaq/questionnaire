import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  biodata: {
    nama: '',
    email: '',
    tingkat_sekolah: '',
    mata_pelajaran: '',
    pengalaman_mengajar: '',
    pengalaman_digital: '',
  },
  biodata_error: {},
};

export const biodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    setBiodata: (state, { payload }) => {
      state.biodata = payload;
    },
    setBiodataError: (state, { payload }) => {
      state.biodata_error = payload;
    },
  },
});

export const { setBiodata, setBiodataError } = biodataSlice.actions;

export default biodataSlice.reducer;
