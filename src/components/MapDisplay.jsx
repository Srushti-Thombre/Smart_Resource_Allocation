import { HiOutlineLocationMarker, HiOutlineExternalLink } from 'react-icons/hi';

export default function MapDisplay({ address }) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-6 backdrop-blur-xl overflow-hidden group">
      <div className="flex items-center justify-between mb-4 px-2">
         <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <HiOutlineLocationMarker className="text-amber-400" />
            Our Location
         </h3>
         <a 
           href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
           target="_blank"
           rel="noopener noreferrer"
           className="text-[10px] font-bold text-amber-200/60 hover:text-amber-200 flex items-center gap-1 transition-colors uppercase tracking-widest"
         >
            Get Directions
            <HiOutlineExternalLink className="h-3 w-3" />
         </a>
      </div>

      <div className="relative h-64 rounded-[2rem] overflow-hidden border border-white/5 bg-slate-900">
        <iframe
          title="NGO Location"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapUrl}
          className="grayscale-[0.2] invert-[0.85] hue-rotate-[180deg] opacity-80"
          style={{ filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
        ></iframe>
        
        <div className="absolute inset-0 pointer-events-none border-[12px] border-slate-950/20 rounded-[2rem]" />
      </div>
      
      <div className="mt-4 px-2">
         <p className="text-[10px] font-medium text-slate-500 leading-relaxed italic">
           {address}
         </p>
      </div>
    </div>
  );
}
