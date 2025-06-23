import React from 'react'
import { Building2, History } from "lucide-react";
import { SocialIcon } from "react-social-icons";

const SocialLinks = ({cityData}) => {
  return (
    <div className="flex justify-center items-center w-full gap-2">
            <div className="tooltip tooltip-bottom" data-tip="City URL">
              {cityData?.website ? (
                <a href={`${cityData.website}`} target="_blank">
                  <Building2 />
                </a>
              ) : (
                ""
              )}
            </div>
            <div className="tooltip tooltip-bottom" data-tip="WIKI URL">
              {cityData?.wikiUrl ? (
                <a href={`${cityData.wikiUrl}`} target="_blank">
                  <img src="/icons/wiki2.png" className="h-6" />
                </a>
              ) : (
                ""
              )}
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Facebook URL">
              {cityData?.facebook ? (
                  <SocialIcon
                    network="facebook"
                    style={{ height: 26, width: 26 }}
                    url={`${cityData.facebook}`}
                    target="_blank"
                  />
              ) : (
                ""
              )}
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Instagram URL">
              {cityData?.instagram ? (
                  <SocialIcon
                    network="instagram"
                    style={{ height: 26, width: 26 }}
                    url={`${cityData.instagram}`}
                    target="_blank"
                  />
              ) : (
                ""
              )}
            </div>
            <div className="tooltip tooltip-bottom" data-tip="X URL">
              {cityData?.x ? (
                  <SocialIcon
                    network="x"
                    style={{ height: 26, width: 26 }}
                    url={`${cityData.x}`}
                    target="_blank"
                  />
              ) : (
                ""
              )}
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Youtube URL">
              {cityData?.youtube ? (
                  <SocialIcon
                    network="youtube"
                    style={{ height: 26, width: 26 }}
                    url={`${cityData.youtube}`}
                    target="_blank"
                  />
              ) : (
                ""
              )}
            </div>
    
            <div className="tooltip tooltip-bottom" data-tip="Historical Site">
              {cityData?.historySite ? (
                <a href={`${cityData.historySite}`} target="_blank">
                  <History />
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
  )
}

export default SocialLinks