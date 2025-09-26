export const cropData = {
  wheat: {
    fertilizers: [
      { 
        name: 'DAP (Di-Ammonium Phosphate)', 
        stage: 'Sowing', 
        dosage: '50-60 kg/acre',
        notes: 'Good source of phosphorus for root development. Apply at sowing time.',
        link: 'https://www.iffcobazar.in/en/page/dap-fertilizer'
      },
      { 
        name: 'Urea', 
        stage: 'Tillering (30-35 days)', 
        dosage: '25-30 kg/acre',
        notes: 'Provides essential nitrogen for leaf growth. Split application recommended.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      { 
        name: 'Potassium Chloride (MOP)', 
        stage: 'Crown Root Initiation', 
        dosage: '15-20 kg/acre',
        notes: 'Essential for grain filling and disease resistance.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      { 
        name: 'NPK 12-32-16', 
        stage: 'Basal Application', 
        dosage: '40-50 kg/acre',
        notes: 'Complete balanced fertilizer for overall plant nutrition.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      }
    ],
    pesticides: [
      { 
        name: 'Clodinafop-propargyl', 
        target: 'Grassy Weeds (Phalaris minor)', 
        dosage: '60g/acre',
        notes: 'Post-emergent herbicide. Apply 30-35 days after sowing.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Propiconazole', 
        target: 'Rust, Powdery Mildew', 
        dosage: '100-125ml/acre',
        notes: 'Systemic fungicide. Apply at flag leaf stage.',
        link: 'https://www.syngenta.co.in/fungicides'
      },
      { 
        name: 'Chlorpyriphos', 
        target: 'Aphids, Termites', 
        dosage: '500ml/acre',
        notes: 'Soil application for termite control. Foliar spray for aphids.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  rice: {
    fertilizers: [
      { 
        name: 'Urea', 
        stage: 'Basal + Top dressing', 
        dosage: '45-50 kg/acre',
        notes: 'Split application: 50% basal, 25% at tillering, 25% at panicle initiation.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      { 
        name: 'Single Super Phosphate (SSP)', 
        stage: 'Basal Application', 
        dosage: '60-80 kg/acre',
        notes: 'Apply before transplanting. Rich in phosphorus and sulfur.',
        link: 'https://www.iffcobazar.in/en/page/ssp-fertilizer'
      },
      { 
        name: 'Muriate of Potash (MOP)', 
        stage: 'Basal + Panicle Initiation', 
        dosage: '25-30 kg/acre',
        notes: 'Split application: 50% basal, 50% at panicle initiation.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      { 
        name: 'NPK 20-20-0-13 (with Sulfur)', 
        stage: 'Basal Application', 
        dosage: '50 kg/acre',
        notes: 'Complete fertilizer with sulfur for better grain quality.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      }
    ],
    pesticides: [
      { 
        name: 'Butachlor', 
        target: 'Grassy and Broadleaf Weeds', 
        dosage: '1000-1250ml/acre',
        notes: 'Pre-emergence herbicide. Apply 3-5 days after transplanting.',
        link: 'https://www.syngenta.co.in/herbicides'
      },
      { 
        name: 'Tricyclazole', 
        target: 'Blast Disease', 
        dosage: '150-200g/acre',
        notes: 'Preventive fungicide. Apply at tillering and booting stage.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Fipronil', 
        target: 'Brown Plant Hopper, Stem Borer', 
        dosage: '40-50g/acre',
        notes: 'Systemic insecticide. Single application provides long protection.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  maize: {
    fertilizers: [
      { 
        name: 'DAP', 
        stage: 'Basal Application', 
        dosage: '50-60 kg/acre',
        notes: 'Apply at planting for strong root development.',
        link: 'https://www.iffcobazar.in/en/page/dap-fertilizer'
      },
      { 
        name: 'Urea', 
        stage: '6-leaf stage + Tasseling', 
        dosage: '60-70 kg/acre',
        notes: 'Split application: 50% at 6-leaf stage, 50% at tasseling.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      { 
        name: 'Potassium Chloride', 
        stage: 'Silk emergence', 
        dosage: '25 kg/acre',
        notes: 'Essential for grain filling and stalk strength.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      { 
        name: 'NPK 10-26-26', 
        stage: 'Basal Application', 
        dosage: '40 kg/acre',
        notes: 'Balanced fertilizer for initial growth phase.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      }
    ],
    pesticides: [
      { 
        name: 'Atrazine', 
        target: 'Broadleaf Weeds', 
        dosage: '500-750g/acre',
        notes: 'Pre-emergence herbicide. Apply within 2 days of sowing.',
        link: 'https://www.syngenta.co.in/herbicides'
      },
      { 
        name: 'Cypermethrin', 
        target: 'Fall Army Worm, Stem Borer', 
        dosage: '80-100ml/acre',
        notes: 'Contact insecticide. Apply during early infestation.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Carbendazim', 
        target: 'Banded Leaf Blight', 
        dosage: '200g/acre',
        notes: 'Systemic fungicide. Preventive application recommended.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  pulses: {
    fertilizers: [
      { 
        name: 'DAP', 
        stage: 'Sowing', 
        dosage: '40-50 kg/acre',
        notes: 'Provides phosphorus for nodulation and root development.',
        link: 'https://www.iffcobazar.in/en/page/dap-fertilizer'
      },
      { 
        name: 'Muriate of Potash', 
        stage: 'Flowering', 
        dosage: '15-20 kg/acre',
        notes: 'Essential for pod filling and grain quality.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      { 
        name: 'NPK 20-20-0-13', 
        stage: 'Basal Application', 
        dosage: '30-40 kg/acre',
        notes: 'Balanced nutrition with sulfur for better protein content.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      },
      { 
        name: 'Rhizobium Biofertilizer', 
        stage: 'Seed Treatment', 
        dosage: '10-15g/kg seed',
        notes: 'Biological nitrogen fixation. Mix with seeds before sowing.',
        link: 'https://www.nabaardbiofertilizer.org/'
      }
    ],
    pesticides: [
      { 
        name: 'Pendimethalin', 
        target: 'Grassy and Broadleaf Weeds', 
        dosage: '750ml/acre',
        notes: 'Pre-emergence herbicide. Apply within 2 days of sowing.',
        link: 'https://www.syngenta.co.in/herbicides'
      },
      { 
        name: 'Quinalphos', 
        target: 'Pod Borer, Aphids', 
        dosage: '400ml/acre',
        notes: 'Broad spectrum insecticide. Apply during flowering stage.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Mancozeb', 
        target: 'Anthracnose, Rust', 
        dosage: '600-800g/acre',
        notes: 'Protective fungicide. Regular spray during humid conditions.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  potato: {
    fertilizers: [
      { 
        name: 'NPK 12-32-16', 
        stage: 'Planting', 
        dosage: '80-100 kg/acre',
        notes: 'Complete fertilizer for initial growth and tuber development.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      },
      { 
        name: 'Urea', 
        stage: 'Earthing up (30-35 days)', 
        dosage: '40-50 kg/acre',
        notes: 'Nitrogen for foliage growth. Apply during first earthing up.',
        link: 'https://www.iffcobazar.in/en/page/urea-fertilizer'
      },
      { 
        name: 'Muriate of Potash', 
        stage: 'Tuber Initiation', 
        dosage: '40-50 kg/acre',
        notes: 'Critical for tuber quality and storage life.',
        link: 'https://www.iffcobazar.in/en/page/mop-fertilizer'
      },
      { 
        name: 'Single Super Phosphate', 
        stage: 'Basal Application', 
        dosage: '60 kg/acre',
        notes: 'Phosphorus for strong root system and early establishment.',
        link: 'https://www.iffcobazar.in/en/page/ssp-fertilizer'
      }
    ],
    pesticides: [
      { 
        name: 'Metalaxyl + Mancozeb', 
        target: 'Late Blight', 
        dosage: '600-800g/acre',
        notes: 'Systemic + contact fungicide. Apply preventively during cool weather.',
        link: 'https://www.syngenta.co.in/fungicides'
      },
      { 
        name: 'Imidacloprid', 
        target: 'Aphids, Jassids', 
        dosage: '40-60ml/acre',
        notes: 'Systemic insecticide. Soil application or foliar spray.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Chlorothalonil', 
        target: 'Early Blight, Scab', 
        dosage: '400-500ml/acre',
        notes: 'Protective fungicide. Start application from 45 days after planting.',
        link: 'https://www.tatachemicals.com/plant-protection'
      }
    ]
  },
  tomato: {
    fertilizers: [
      { 
        name: 'NPK 19-19-19', 
        stage: 'Vegetative Growth', 
        dosage: '10-15g/plant/week',
        notes: 'Balanced nutrition during early growth phase.',
        link: 'https://www.coromandel.biz/product-category/fertilizers/complex-fertilizers/'
      },
      { 
        name: 'Calcium Nitrate', 
        stage: 'Flowering & Fruiting', 
        dosage: '5-8g/plant/week',
        notes: 'Prevents blossom end rot and improves fruit quality.',
        link: 'https://www.iffcobazar.in/en/page/calcium-nitrate'
      },
      { 
        name: 'Potassium Sulphate', 
        stage: 'Fruit Development', 
        dosage: '8-10g/plant/week',
        notes: 'Improves fruit color, taste and shelf life.',
        link: 'https://www.iffcobazar.in/en/page/potassium-sulphate'
      },
      { 
        name: 'Magnesium Sulphate', 
        stage: 'Throughout Season', 
        dosage: '2-3g/plant/week',
        notes: 'Prevents yellowing of leaves and improves photosynthesis.',
        link: 'https://www.iffcobazar.in/en/page/magnesium-sulphate'
      }
    ],
    pesticides: [
      { 
        name: 'Azoxystrobin', 
        target: 'Early Blight, Late Blight', 
        dosage: '100-150ml/acre',
        notes: 'Systemic fungicide. Apply at first sign of disease.',
        link: 'https://www.syngenta.co.in/fungicides'
      },
      { 
        name: 'Acetamiprid', 
        target: 'Whitefly, Aphids', 
        dosage: '40-50g/acre',
        notes: 'Systemic insecticide. Effective against sucking pests.',
        link: 'https://www.bayer.com/en/agriculture/products-and-services/crop-protection'
      },
      { 
        name: 'Bacillus thuringiensis', 
        target: 'Fruit Borer, Leaf Miner', 
        dosage: '300-400g/acre',
        notes: 'Biological insecticide. Safe for beneficial insects.',
        link: 'https://www.biocontrolindia.com/'
      }
    ]
  }
};