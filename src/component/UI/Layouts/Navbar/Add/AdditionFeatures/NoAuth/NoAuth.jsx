const NoAuth = ({ register, billable }) => {
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 mb-5 mt-1 mr-2 gap-1 md:gap-2">
        <label className="label">
          <span className="modal-label-name">Patient Name</span>
        </label>
        <select
          // disabled={patientsNameLoading || !billable ? true : false}
          className="col-span-2 modal-input-field ml-1 w-full"
          {...register("client_id")}
          onChange={(e) => setClientId(e.target.value)}
        >
          {!billable ? (
            <option disabled value={1}>
              Non-Billable Client
            </option>
          ) : (
            <>
              <option value="0"></option>
              {/* {patientsName?.claims?.map((patient) => {
                      return (
                        <option key={patient?.id} value={patient?.id}>
                          {patient?.client_full_name}
                        </option>
                      );
                    })} */}
            </>
          )}
        </select>
        <label className="label">
          <span className="modal-label-name">Provider Name</span>
        </label>

        <div className="col-span-2 flex item-center">
          <select
            className=" modal-input-field ml-1 w-2/3"
            {...register("provider_id")}
          >
            <option value="0">Select Provider</option>
            {/* {providersName?.claims?.map((provider) => {
                      return (
                        <option key={provider?.id} value={provider?.id}>
                          {provider?.full_name}
                        </option>
                      );
                    })} */}
          </select>
          <button
            type="button"
            onClick={() => availabilityHandler()}
            className="dcm-input-button ml-2"
          >
            Availability
          </button>
        </div>
        <label className="label">
          <span className="modal-label-name">Service</span>
        </label>
        <div className="col-span-2 flex items-center gap-1">
          <select
            // disabled={patientsNameLoading || !billable ? true : false}
            className=" modal-input-field ml-1 w-full"
            {...register("active_auth")}
          >
            <option value="0"></option>
          </select>
          <select
            // disabled={patientsNameLoading || !billable ? true : false}
            className=" modal-input-field ml-1 w-full"
            {...register("active_auth")}
          >
            <option value="0"></option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NoAuth;
