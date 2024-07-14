import "./ONama.css";
import timPic from "../../icons/tim.jpeg";

const ONama = () => {
  return (
    <div className="o-nama">
      <div className="pocetak">
        <div className="levi">
          <div className="tekst">
            U srcu našeg lepog grada, među uskim ulicama koje kriju brojne
            priče, nalazi se Restoran "Restauration" - oaza ukusa i elegancije
            koja je postala legenda našeg kraja.
          </div>
        </div>
        <div className="desni">
          <div className="kartica">
            <img
              src="https://as2.ftcdn.net/v2/jpg/02/98/66/09/1000_F_298660931_vKBc0Wl4me0gSSC9S96sFE74jglgLjE7.jpg"
              className="card-img-top"
              alt=""
            />
            <div className="kartica-body">
              <p className="kartica-text">Osnivači</p>
            </div>
          </div>
        </div>
      </div>
      <div className="o-nama-tekst">
        U srcu našeg lepog grada, među uskim ulicama koje kriju brojne priče,
        nalazi se Restoran "Restauration" - oaza ukusa i elegancije koja je
        postala legenda našeg kraja. Naša priča počinje pre više decenija, kada
        su naši osnivači, ljubitelji hrane i stručnjaci u kulinarskoj umetnosti,
        odlučili da stvore nešto posebno - mesto gde će se susretati tradicija i
        inovacija, gde će svaki obrok biti ispunjen ljubavlju i pažnjom. Sa
        vizijom da stvore gastronomski raj, oni su okupili tim stručnjaka,
        pronašli najkvalitetnije sastojke i otvorili vrata restorana koji će
        postati sinonim za vrhunsko gostoprimstvo i izvanredne ukuse. Kroz
        godine, Restoran "Restauration" je postao neizostavan deo našeg grada -
        mesto susreta porodica, prijatelja i ljubitelja hrane iz celog sveta.
        Naša istorija nije samo o jelima koja služimo, već o ljudima koji čine
        srce našeg restorana - od našeg posvećenog tima u kuhinji do ljubaznog
        osoblja u sali, svako od njih doprinosi da se stvori nezaboravno
        iskustvo za naše goste. Naša veza sa lokalnim zajednicama i
        tradicionalnim dobavljačima obezbeđuje svežinu i kvalitet svake
        namirnice koju koristimo, dok naša kreativna kuhinja inspiriše sa
        autentičnim ukusima i inovativnim jelima. Svaki detalj u našem restoranu
        odražava našu posvećenost vrhunskom kvalitetu i doživljaju koji ostavlja
        bez daha. Restoran "Restauration" nije samo mesto za obrok - to je
        destinacija za gastronomsku avanturu, mesto gde se ukusni trenuci
        pretvaraju u nezaboravna iskustva. Pozivamo vas da budete deo naše
        priče, da sa nama istražite svet ukusa i mirisa koji će očarati vaša
        čula i ostaviti trag u vašim uspomenama. Dobrodošli u Restoran
        "Restauration" - gde se svaki zalogaj pretvara u priču.
      </div>
      <div className="nas-tim">
        <div className="kartica">
          <img src={timPic} className="card-img-top" alt="" />
          <div className="kartica-body">
            <p className="kartica-text">Naš tim</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONama;
