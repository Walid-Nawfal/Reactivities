using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper.QueryableExtensions;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // public DataContext Context { get; }

            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                // we can do 
                // var activity = await _context.Activities.FindAsync(request.Id);
                // if(activity == null) throw new Exception("Activity not found");
                // we are doing this because we can't say if(activity == null) return NotFound() because we aren't in an API controller
                // but the whole logic of dealing with the error is heavy because of using exception
                // so it is preferred not to do so

                var activity = await _context.Activities
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                
                return Result<ActivityDTO>.Success(activity);
            }
        }
    }
}