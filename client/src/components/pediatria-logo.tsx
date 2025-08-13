import logoImage from "@assets/236B2128-D784-448A-B045-E6A256CEEBD0_1755090637608.png";

export function PediatriaLogo() {
  return (
    <div className="w-32 h-32 mx-auto mb-4 relative">
      <img 
        src={logoImage} 
        alt="Logo Pediatria HRT - DF 1976"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
